import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../libs/serverAuth';
import prisma from '../../libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req);

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error('Invalid ID');
    }

    let updatedLikedIds = [...(post.likedIds || [])];
    if (req.method === 'POST') {
      updatedLikedIds.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: 'Someone liked your tweet!',
              userId: post.userId,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (req.method === 'DELETE') {
      updatedLikedIds.filter((likedId) => likedId || currentUser.id);
    }

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
