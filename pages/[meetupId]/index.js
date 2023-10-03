import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="dscription"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://volkanturhan:lBHioveRsUVPYUWC@cluster0.n3lemgu.mongodb.net/meetups?retryWrites=true&w=majority&appName=AtlasApp"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    // fallback: false, //if false only this id's works m3 not working
    fallback:'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // [
    //   {
    //     params: { meetupId: "m1" },
    //   },
    //   {
    //     params: { meetupId: "m2" },
    //   },
    // ],
  };
}
export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://volkanturhan:lBHioveRsUVPYUWC@cluster0.n3lemgu.mongodb.net/meetups?retryWrites=true&w=majority&appName=AtlasApp"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },

      // {
      //   id: meetupId,
      //   title: "A First Meetup",
      //   image:
      //     "https://techboomers.com/wp-content/uploads/2017/11/sites-like-meetup-h.jpg",
      //   address: "Some address 5, 12345 Some City",
      //   description: "This is a first meetup",
      // },
    },
    revalidate: 3600,
  };
}

export default MeetupDetailPage;
