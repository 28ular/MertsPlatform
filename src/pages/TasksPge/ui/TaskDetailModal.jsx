import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IoClose, IoEyeSharp, IoLinkOutline } from "react-icons/io5";
import { PiTelegramLogoLight } from "react-icons/pi";
import { getTaskById, submitTask } from "../../../../api/getTasks.js";
import cls from "../styles/task.module.scss";

const STATUS_LABELS = {
  SENT: "Отправлено",
  IN_REVIEW: "На проверке",
  REVISION: "На доработку",
  ACCEPTED: "Принято",
};

export const TaskDetailModal = ({ task, onClose }) => {
  const queryClient = useQueryClient();
  const [detail, setDetail] = useState(task);
  const [solutionLink, setSolutionLink] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!task?.id) return;
    getTaskById(task.id)
      .then((res) => {
        const item = res?.task || res;
        if (item) setDetail(item);
      })
      .catch(() => {});
  }, [task?.id]);

  if (!task) return null;

  const submission = detail?.mySubmission || detail?.submission;
  const statusText = STATUS_LABELS[submission?.status] || "Не выполнено";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!solutionLink.trim()) {
      toast.warning("Вставьте ссылку на решение");
      return;
    }

    setLoading(true);
    try {
      await submitTask(detail.id, {
        solutionLink: solutionLink.trim(),
        comment: comment.trim(),
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Задание отправлено на проверку!");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Ошибка при отправке задания");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cls.modal_overlay} onClick={onClose}>
      <div
        className={cls.modal_card}
        data-aos="zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button className={cls.modal_close} onClick={onClose}>
          <IoClose />
        </button>

        <div className={cls.modal_header}>
          <div className={cls.modal_badges}>
            {detail?.topic && <span className={cls.badge}>{detail.topic}</span>}
            {detail?.hasScore && detail?.maxScore != null && (
              <span className={cls.badge}>Макс. {detail.maxScore} баллов</span>
            )}
            {detail?.isBonus && <span className={cls.badge_bonus}>Бонус</span>}
          </div>
          <h2>{detail?.title}</h2>
          <p className={cls.modal_desc}>{detail?.description}</p>
        </div>

        {(detail?.exampleLink || detail?.attachmentLink) && (
          <div className={cls.modal_links}>
            {detail?.exampleLink && (
              <button
                type="button"
                onClick={() => window.open(detail.exampleLink, "_blank")}
              >
                <IoEyeSharp /> Посмотреть пример
              </button>
            )}
            {detail?.attachmentLink && (
              <button
                type="button"
                onClick={() => window.open(detail.attachmentLink, "_blank")}
              >
                <IoLinkOutline /> Материалы
              </button>
            )}
          </div>
        )}

        {submission && (
          <div className={cls.modal_submission}>
            <div>
              Статус: <b>{statusText}</b>
              {submission?.score != null && ` • Балл: ${submission.score}`}
            </div>
            {submission?.reviewerComment && (
              <p>Комментарий ментора: {submission.reviewerComment}</p>
            )}
          </div>
        )}

        <form className={cls.modal_form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ссылка на решение (GitHub, Figma, Vercel...)"
            value={solutionLink}
            onChange={(e) => setSolutionLink(e.target.value)}
            required
          />
          <textarea
            rows={3}
            placeholder="Комментарий к работе (необязательно)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            <PiTelegramLogoLight />
            {loading ? "Отправка..." : "Отправить задание"}
          </button>
        </form>
      </div>
    </div>
  );
};
