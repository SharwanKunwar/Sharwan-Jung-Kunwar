import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { SiOpenaccess } from "react-icons/si";
import { FaOpencart, FaOpenid } from "react-icons/fa";
import { ArrowBigDown } from "lucide-react";

function BlogPage({ id, title, des }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/40  backdrop-blur-md rounded-lg p-4 shadow-md flex gap-4 items-center justify-between">

      <div className="flex  h-full items-center w-full justify-between px-5 items-center">
        <div className="bg-linear-to-br from-indigo-400 to-slate-800 shadow-md w-[50px] h-[50px] rounded-sm"></div>
        <section className="w-[70%]">
          <h2 className="font-medium text-shadow-sm text-md text-slate-800">{title}</h2>
        </section>
        <Button
          onClick={() => navigate(`/blog/${id}`)}
          className=" bg-black text-white px-5! py-1 rounded-md text-sm shadow-sm"
        >
          Read
        </Button>
      </div>

    </div>
  );
}

export default BlogPage;