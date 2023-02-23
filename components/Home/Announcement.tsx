import { IAnnouncement } from "../../models/Announcement"

const Announcement = ({ announcement }: { announcement: IAnnouncement }) => {
  return (
    <>
      {announcement.isPublished && (
        <div className="animate-dropDown mb-1 bg-Green flex flex-col justify-center items-center text-blue max-h-fit max-w-screen mx-auto rounded-t-2xl rounded-b-lg px-2 md:mb-1 gap-1 even:bg-orange even:text-Green even:drop-shadow">
          <h1 className="text-sm lg:text-2xl border-b-2 text-center shadow-sm font-medium">
            {announcement.title}
          </h1>

          {announcement.description.toLowerCase() !== "no" && (
            <p className="text-center max-w-screen">
              {announcement.description}
            </p>
          )}

          {announcement.link.toLowerCase() !== "no" && (
            <a
              href={announcement.link}
              className="text-center opacity-70 hover:opacity-100 hover:scale-110 text-Black"
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
