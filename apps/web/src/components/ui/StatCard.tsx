import { motion } from "framer-motion";
import type { ReactNode } from "react";


interface Props {
  title: string;
  value: string;
  icon: ReactNode;
  status?: string;
}


export default function StatCard({
  title,
  value,
  icon,
  status
}: Props) {

  return (

    <motion.div

      initial={{
        opacity:0,
        y:20
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        duration:0.5
      }}

      className="
      rounded-3xl
      border
      border-white/10
      bg-white/10
      p-6
      backdrop-blur-xl
      shadow-xl
      "

    >


      <div className="flex items-center justify-between">


        <div>

          <p className="text-sm text-white/50">
            {title}
          </p>


          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>


          {
            status && (

              <p className="mt-2 text-sm text-green-400">
                {status}
              </p>

            )
          }


        </div>



        <div className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-white/10
        text-white
        ">

          {icon}

        </div>


      </div>


    </motion.div>

  );

}
