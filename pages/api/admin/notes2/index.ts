import { NextApiRequest, NextApiResponse } from "next"
import { getNotes } from "../../../../utils/dataHooks/getNotes"
import {
  createNote,
  updateNote,
  deleteNote,
} from "../../../../utils/dataHooks/createNote"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const notes = await getNotes()
    return res.status(200).json(notes)
  } else if (req.method === "POST") {
    const note = await createNote(req.body)
    return res.status(200).json(note)
  } else if (req.method === "DELETE") {
    const note = await deleteNote(req.body)
    return res.status(200).json(note)
  } else if (req.method === "PUT") {
    const note = await updateNote(req.body)
    return res.status(200).json(note)
  } else {
    return res.status(405).json({ message: "Method not allowed" })
  }
}

export default handler
