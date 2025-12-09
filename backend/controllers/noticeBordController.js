import NoticeBord from "../models/NoticeBordModel.js";

export const createNotice = async (req, res) => {
  try {
    const { title, content, postedBy } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const notice = await NoticeBord.create({
      title,
      content,
      postedBy,
    });
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: "Failed to create notice", error });
  }
};

export const getAllNotices = async (req, res) => {
  try {
    const notices = await NoticeBord.find({});
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: "internal server error", err });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const { noticeId } = req.params;
    const { title, content } = req.body;
    const updatedNotice = await NoticeBord.findByIdAndUpdate(
      noticeId,
      { title, content },
      { new: true }
    );

    res.json(updatedNotice);
  } catch (err) {
    res.status(500).json({ message: "Failed to update notice", err });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { noticeId } = req.params;
    const deletedNotice = await NoticeBord.findByIdAndDelete(noticeId);

    res.json("Notice deleted successfully");
  } catch (err) {
    res.status(500).json({ message: "Failed to delete notice", err });
  }
};
