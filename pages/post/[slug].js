import React from "react";
import PostWidget from "@/components/PostWidget";
import Categories from "@/components/Categories";
import PostDetail from "@/components/PostDetail";
import Author from "@/components/Author";
import CommentsForm from "@/components/CommentsForm";
import {Comments} from "@/components";
import {getPostDetails, getPosts} from "@/services";
import {useRouter} from "next/router";
import Loader from "@/components/Loader";
const PostDetails = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />
    }
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-9">
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className="col-span-1 lg:col-span-3">
                    <div className="relative lg:sticky top-8">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails

export async function getStaticProps({ params }){
    const data = await getPostDetails(params.slug)
    return {
        props: { post: data }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts();

    return {
        paths: posts.map(({ node : {slug}}) => ({ params: { slug }})),
        fallback: true,
    }
}