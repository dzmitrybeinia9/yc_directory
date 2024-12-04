"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_NAME_QUERY, STARTUP_BY_ID_QUERY} from "@/sanity/lib/queries";

export const createPitch = async (
    form: FormData,
    pitch: string,
) => {
    const session = await auth();

    console.log(session);

    const author = await client.fetch(AUTHOR_BY_NAME_QUERY, {name: session?.user?.name});
    console.log(author);

    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch"),
    );

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: author._id,
            },
            pitch,
        };

        const result = await writeClient.create({ _type: "startup", ...startup });

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        });
    } catch (error) {

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        });
    }
};