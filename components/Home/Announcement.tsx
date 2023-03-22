import { IAnnouncement } from "../../utils/dataHooks/getAllAnnouncements"

const Announcement = ({ announcement }: { announcement: IAnnouncement }) => {
  return (
    <>
      {announcement.isPublished && (
        <div className="max-w-screen mx-auto mb-1 flex max-h-fit animate-dropDown flex-col items-center justify-center gap-1 rounded-t-2xl rounded-b-lg bg-Green px-2 text-blue even:bg-orange even:text-Green even:drop-shadow md:mb-1">
          <h1 className="text-center text-sm font-medium shadow-sm lg:text-2xl">
            {announcement.title}
          </h1>

          {announcement.description && (
            <p className="max-w-screen text-center">
              {announcement.description}
            </p>
          )}

          {announcement.link && (
            <a
              href={announcement.link}
              className="text-center text-Black opacity-70 hover:scale-110 hover:opacity-100"
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
