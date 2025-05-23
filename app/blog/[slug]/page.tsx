import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { marked } from "marked";
import dynamic from "next/dynamic";
import PhotoSwipeProvider from "@/components/PhotoSwipeProvider";
import InviteSocialMedia from "@/components/InviteSocialMedia";

const BlogGallery = dynamic(() => import("./BlogGallery"), {
    ssr: true,
});

type BlogData = {
    title: string;
    slug: string;
    date: string;
    images: { src: string; width: number; height: number }[];
    content: string;
};

export async function generateStaticParams() {
    const dir = path.join(process.cwd(), "content/blogs");
    const files = fs.readdirSync(dir);
    return files.map((filename) => ({
        slug: filename.replace(/\.md$/, ""),
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const awaitedParams = await Promise.resolve(params);
    const { slug } = awaitedParams;
    const blog = await getBlog(slug);
    if (!blog) return {};
    return {
        title: `${blog.title} | Blog`,
        description: blog.content.slice(0, 160),
        openGraph: {
            title: blog.title,
            description: blog.content.slice(0, 160),
            images: blog.images?.map(({ src, width, height }) => ({
                url: src,
                width,
                height,
            })),
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.content.slice(0, 160),
            images: blog.images?.map(({ src }) => src),
        },
    };
}

async function getBlog(slug: string): Promise<BlogData | null> {
    const filePath = path.join(process.cwd(), "content/blogs", `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
        title: data.title || "Bez tytułu",
        slug: data.slug || slug,
        date: data.date || "",
        images: data.images || [],
        content,
    };
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const awaitedParams = await Promise.resolve(params);
    const { slug } = awaitedParams;
    const blog = await getBlog(slug);
    if (!blog) return notFound();

    const htmlContent = marked.parse(blog.content);

    return (
        <>
            <article className="max-w-4xl mx-auto px-1.5 py-12 w-full anim-opacity">
                <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl font-medium mb-4">{blog.title}</h1>
                    <p className="text-gray-500 text-sm mb-8">
                        {new Date(blog.date).toLocaleDateString("pl-PL")}
                    </p>

                    <div
                        className="text-lg mb-12 space-y-6"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>

                {/* Obrazy z frontmattera */}
                {blog.images.length > 0 && (
                    <PhotoSwipeProvider galleryId="#gallery">
                        <BlogGallery images={blog.images} />
                    </PhotoSwipeProvider>
                )}
            </article>
            <div className="pb-20">
                <InviteSocialMedia
                    text="Podziel sie swoja Opinią na"
                    textColor="text-black"
                />
            </div>
        </>
    );
}
