import Head from "next/head";
import { MongoClient } from "mongodb";
// import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://techboomers.com/wp-content/uploads/2017/11/sites-like-meetup-h.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://techboomers.com/wp-content/uploads/2017/11/sites-like-meetup-h.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a second meetup",
  },
];
function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  return;
  <>
    <Head>
      <title>React Meetups</title>
      <meta
        name="dscription"
        content="Browse a huge list of highly active React Meetups!"
      />
    </Head>
    <MeetupList meetups={props.meetups} />
  </>;
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //fetc data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     //revalidate:3600 not necessery because every time new data
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://volkanturhan:lBHioveRsUVPYUWC@cluster0.n3lemgu.mongodb.net/meetups?retryWrites=true&w=majority&appName=AtlasApp"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  // fetch("/api/meetups");
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })), //DUMMY_MEETUPS,
    },
    revalidate: 3600,
  };
}
export default HomePage;
