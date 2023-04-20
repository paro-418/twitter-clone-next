import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../libs/serverAuth';
import prisma from '../../libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') return res.status(405).end();
  // console.log(req.method);
  // console.log(req.body);

  try {
    const { currentUser } = await serverAuth(req);
    // console.log(currentUser, `from EDIT`);
    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error('Missing Fields');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        bio,
        username,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
