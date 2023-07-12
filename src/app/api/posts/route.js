import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const POST = async (request) => {
  const body = await request.json();

  try {
    await connect();

    const existingPost = await Post.findOne({ _id: body._id });

    if (existingPost) {
      // console.log(`Post with ID ${body._id} already exists. Skipping...`);
      return new NextResponse("skipped already exists", { status: 200 });
    } else {
      const newPost = new Post(body);
      await newPost.save();
      // console.log(`New post created with ID ${body._id}`);
      return new NextResponse("Post has been created", { status: 201 });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};





// import { NextResponse } from "next/server";
// import connect from "@/utils/db";
// import Post from "@/models/Post";


// export const POST = async (request) => {
//   const body = await request.json();
  
//   // return new Response(JSON.stringify(body),
//   //   { status: 200 }
//   // )
//   const newPost = new Post(body);

//   try {
//     await connect();

//     // await body.save();
//     await newPost.save();
//     // console.log("Saved");
//     return new NextResponse("Post has been created", { status: 201 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };

