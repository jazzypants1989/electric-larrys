import type { Announcement as IAnnouncement } from "@/types"

const Announcement = ({ announcement }: { announcement: IAnnouncement }) => {
  return (
    <>
      {announcement.isPublished && (
        <div className="max-w-screen mx-auto mb-1 flex max-h-fit animate-dropDown flex-col items-center justify-center gap-1 rounded-t-2xl rounded-b-lg bg-Green px-2 text-blue even:bg-orange even:text-Yellow md:mb-1">
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
              className="text-center text-Black opacity-90 hover:scale-110 hover:opacity-100"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="w-8/9 rounded-lg py-1 text-center text-Black opacity-90 drop-shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-2 hover:bg-orange hover:opacity-100">
                Click here to learn more!
              </h3>
            </a>
          )}
        </div>
      )}
    </>
  )
}
export default Announcement
