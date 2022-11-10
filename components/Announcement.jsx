const Announcement = ({ announcement }) => {
  return (
    <>
      {announcement.isPublished && (
        <div className="animate-dropDown bg-Green flex flex-col justify-center items-center text-blue max-h-fit min-w-screen mx-8 rounded-t-2xl rounded-b-lg px-2 md:mb-2 gap-1 even:bg-orange even:text-Green even:mt-4 pb-2">
          <h1 className="sm:text-sm lg:text-2xl border-b-2 text-center shadow-sm font-medium">
            {announcement.title}
          </h1>

          {announcement.description.toLowerCase() !== "no" && (
            <p className="text-center">{announcement.description}</p>
          )}

          {announcement.link.toLowerCase() !== "no" && (
            <a
              href={announcement.link}
              className="text-center opacity-70 hover:opacity-100 text-Black"
            >
              Click here to learn more!
            </a>
          )}
        </div>
      )}
    </>
  )
}
export default Announcement