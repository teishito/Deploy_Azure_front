import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StoreDetails from "../../components/StoreDetails";

export default function Details({ storeDetails }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-lg mx-auto py-6 px-4">
        <StoreDetails storeDetails={storeDetails} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://tech0-gen-8-step3-testapp-py2-19.azurewebsites.net/api/details/${id}`);
  const data = await res.json();
  return { props: { storeDetails: data } };
}