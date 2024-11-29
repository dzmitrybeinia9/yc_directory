import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams}: {
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await searchParams).query;
    return (
        <>
            <section className={"pink_container"}>
                <h1 className={"heading"}>Pitch Your Startups</h1>
                <p className={"sub-heading !max-w-3xl"}>
                    Submit your startup idea and get a chance to pitch it to investors.
                </p>
                <SearchForm query={query}/>
            </section>
        </>
    );
}
