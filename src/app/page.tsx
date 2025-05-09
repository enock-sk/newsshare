import NewsForm from "../components/NewsForm";
import NewsList from "../components/NewsList";

export default function Home() {
  return (
    <main className="py-12">
      <NewsForm />
      <NewsList />
    </main>
  );
}
