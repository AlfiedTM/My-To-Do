import { Circles } from "react-loader-spinner";

export default function Loader({text}) {
    return (
        <div className="relative">
            <div className="flex flex-col items-center justify-center h-screen">
                {/* <div className="grid grid-col-1"> */}
                <Circles
                    height={80}
                    width={80}
                    color="#4fa94d"
                    visible={true}
                    wrapperClass=""
                    wrapperStyle={{}}
                />
                {/* </div> */}
                <h4 className="block font-bold mt-2">{text}</h4>
            </div>
        </div>
  )
}