import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}: {
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await searchParams).query;

    const posts = [{
        _createdAt: new Date(),
        _id: "1",
        views: 100,
        description: "A platform for developers to showcase their projects and get feedback.",
        author: {
            _id: "1",
            name: "John Doe"
        },
        image: 'https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
        title: "DevHub",
        category: "Tech"
    }];

    return (
        <>
            <section className={"pink_container"}>
                <h1 className={"heading"}>Pitch Your Startups</h1>
                <p className={"sub-heading !max-w-3xl"}>
                    Submit your startup idea and get a chance to pitch it to investors.
                </p>
                <SearchForm query={query}/>
            </section>

            <section className={"section_container"}>
                <p className={"text-30-semibold"}>
                    {query ? (`Search results for "${query}"`) : ("All Startups")}
                </p>

                <ul className={"mt-7 card_grid"}>
                    {posts?.length > 0 ?
                        (
                            posts.map((post: StartupCardType) => (
                                <StartupCard key={post?._id} post={post}/>
                            ))
                        ) : (
                            <p className={"no-result"}>No startups found</p>
                        )
                    }
                </ul>
            </section>
        </>
    );
}

export type StartupCardType = {
    _createdAt: Date;
    _id: string;
    views: number;
    description: string;
    author: {
        _id: string;
        name: string;
    },
    image: string;
    title: string;
    category: string;
}
