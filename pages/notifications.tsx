import React from 'react';
import Header from '../components/Header';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import NotificationsFeed from '../components/notificationsFeed';

const Notifications = () => {
  return (
    <>
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed/>
    </>
  );
};

export default Notifications;

export async function getServerSideProps(context: NextPageContext) {
  const session = getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
