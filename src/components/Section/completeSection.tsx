import Button from "./button"
import Heading from "./heading"
import Options from "./options"

export default function CompleteSection({heading,subheading}:{heading:string, subheading:string}){
    return (
      <div className="w-[100%] h-[100vh] flex justify-center items-center flex-wrap">
        <div className="flex flex-wrap justify-center">
        <Options/>
        <Heading heading={heading} subheading={subheading}/>
        <Button/>
        </div>
      </div>
    )
}