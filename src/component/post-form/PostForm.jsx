import React, { useCallback, useEffect } from "react";
import { RTE, Input, Button, Select } from "../index";
import { useForm } from "react-hook-form";
import databasesService from "../../appwrite/configService/config-Service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, getValues, control, setValue } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    // to upload new image
    if (post) {
      const file = data.image[0]
        ? databasesService.uploadFile(data.image[0])
        : null;

      // to delete old image
      if (file) {
        databasesService.deleteFile(post.featuredImage);
      }

      // to update post
      const dbPost = await databasesService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,

        // after updating the post user will navigate to post URL
        if(dbPost) {
          navigate(`/post/${dbPost.$id}`);
        },
      });
    }

    // handle new post or new form
    else {
      // use argument and checks whether post is exist or not TODO

      const file = databasesService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        // upload image in new post
        data.featuredImage = fileId;
        const dbPost = await databasesService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");

      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransform(value.title, {
            shouldValidate: true,
          })
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
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
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
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
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
