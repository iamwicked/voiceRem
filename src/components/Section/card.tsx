
export default function Card({title, content}:{title:String, content:String}){

    return(
        <div className="w-[85vw] h-[200vh] ml-[120px]" id="card">
        <h1>{title}</h1>
        <div className="bg-red-300 p-[20px]">{content}</div>
        </div>
    )


}