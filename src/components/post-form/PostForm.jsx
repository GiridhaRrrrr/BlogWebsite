import React, {useEffect, useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, SelectField, RTE} from '../index'
import appwriteDBService from "../../appwrite/database/database"
import appwriteBucketService from "../../appwrite/storage/storage"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// this form is used for post and edit also if you want to edit then we must have post details
// which is sent by the user

function PostForm({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        // watch provides watching capabilty over a field 
        // setValue and getValue  to set and get values from child componnets
        // control is the one which link this parent component to child componenet
        // inside useForm we can give default values 
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => { //data is given by recat hook form
        // if we have post means we are editing 
        if (post) {
            // first we upload the new image to the bucket if image is there images are in form of array
            const file = data.image[0] ? await appwriteBucketService.uploadFile(data.image[0]) : null;

            // if file is present then delete the existing on from the post by passing the image id
            if (file) {
                await appwriteBucketService.deleteFile(post.featuredImage);
            }

            // now uodating the post by slug and and data is spread and featured image is overridden if new file is there
            const dbPost = await appwriteDBService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined, //post.featuredImage can be placed insted of undefined
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`); //navigating user after updating
            }
        }else{
            //new post is getting created
            // 1st hting is to upload the file
            const file = await appwriteBucketService.uploadFile(data.image[0]);
            // todo to handle it better

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteDBService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    // slug-transform
    const slugTransform = useCallback((value) => {
        // if value present then remove spaces and addd - in place of space
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        // any method you write hold it in a variable here we wrote watch method you can also use for login method or others
        // watch comes from react hook form so in that methid we get value and name.
        const subscription = watch((value, { name }) => {
            // value is all the values in the form and name is the one we pass to this watch
            if (name === "title") {
                // use setVlue to set the value of the title acc to this slugTransform
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe(); //completion we unsubscribe helps in memory managementafter 
    }, [watch, slugTransform, setValue]);

    // this is asked in interviews where they ask we use useEffect then to optimize it what can we do is use this unsubscribe process
    
    

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        {/* divide form into 2 parts w-2/3 left part remaining right part */}
        <div className="w-2/3 px-2"> 
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            {/* the contol we are passing here */}
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteBucketService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <SelectField
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default PostForm
