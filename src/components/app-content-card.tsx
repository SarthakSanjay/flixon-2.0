interface content {
  name: string;
  url: string;
  textImg: string;
}
export default function ContentCard({ content }: { content: content }) {
  return (
    <div className="h-full w-[20rem] group shrink-0  rounded-lg relative hover:scale-110 transition-all duration-300">
      <img
        src={content.url}
        className="h-full w-full absolute top-0 left-0 z-10 object-center rounded-lg"
      />
      <div className="h-full w-full absolute top-0 left-0 z-0 group-hover:z-20 group-hover:bg-black/50 transition-all duration-300"></div>
      <div className="h-1/2 w-full flex justify-center absolute bottom-0 z-30  transition-all duration-300 group-hover:-translate-y-5 rounded-lg">
        <img
          src={content.textImg}
          className="h-full w-1/2 group-hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>
  );
}
