import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  IoAttachOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoCheckmarkCircle,
  IoCloudUploadOutline,
  IoCodeSlash,
  IoColorPaletteOutline,
  IoGiftOutline,
  IoListOutline,
  IoOpenOutline,
  IoStar,
  IoStatsChart,
  IoTimeOutline,
} from "react-icons/io5";
import { getTaskById, submitTask } from "../../../../api/getTasks.js";
import { Loader } from "../../../components/Loader.jsx";
import cls from "../styles/task.module.scss";

const STATUS_META = {
  SENT: { label: "Отправлено на проверку", key: "review" },
  IN_REVIEW: { label: "На проверке у ментора", key: "review" },
  REVISION: { label: "Требуется доработка", key: "revision" },
  ACCEPTED: { label: "Работа принята", key: "accepted" },
};

const getTaskIcon = (topic = "") => {
  const lower = topic.toLowerCase();
  if (lower.includes("дизайн") || lower.includes("ui") || lower.includes("ux")) {
    return <IoColorPaletteOutline />;
  }
  if (lower.includes("аналит") || lower.includes("data")) {
    return <IoStatsChart />;
  }
  return <IoCodeSlash />;
};

export const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [detail, setDetail] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [solutionLink, setSolutionLink] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setFetching(true);
    setError(null);
    getTaskById(id)
      .then((res) => {
        const item = res?.task || res;
        setDetail(item);
        const sub = item?.mySubmission || item?.submission;
        if (sub?.solutionLink) setSolutionLink(sub.solutionLink);
        if (sub?.comment) setComment(sub.comment);
      })
      .catch(() => {
        setError("Не удалось загрузить задание");
      })
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching) return <Loader />;

  if (error || !detail) {
    return (
      <div className={cls.detail_page}>
        <button
          className={cls.detail_back_btn}
          onClick={() => navigate("/tasks")}
        >
          <FaArrowLeft /> Назад к заданиям
        </button>
        <div className={cls.empty_filter}>
          <p>{error || "Задание не найдено"}</p>
        </div>
      </div>
    );
  }

  const submission = detail?.mySubmission || detail?.submission;
  const canSubmit = !submission || submission?.status === "REVISION";
  const statusMeta = STATUS_META[submission?.status] || {
    label: "Не отправлено",
    key: "new",
  };
  const dateValue = detail?.deadline || detail?.createdAt;
  const requirements = Array.isArray(detail?.requirements)
    ? detail.requirements
    : [];
  const hasMaterials = Boolean(detail?.exampleLink || detail?.attachmentLink);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!solutionLink.trim()) {
      toast.warning("Вставьте ссылку на решение");
      return;
    }

    setLoading(true);
    try {
      await submitTask(id, {
        solutionLink: solutionLink.trim(),
        comment: comment.trim(),
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(
        submission?.status === "REVISION"
          ? "Доработка отправлена на проверку!"
          : "Задание отправлено на проверку!",
      );
      navigate("/tasks");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Ошибка при отправке задания",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cls.detail_page} data-aos="fade-up">
      <button
        className={cls.detail_back_btn}
        onClick={() => navigate("/tasks")}
      >
        <FaArrowLeft /> Назад к заданиям
      </button>

      <div className={cls.detail_grid}>
        <div className={cls.detail_left}>
          <div className={cls.detail_hero}>
            <div className={cls.detail_hero_icon}>
              {getTaskIcon(detail?.topic)}
            </div>

            <div className={cls.detail_hero_info}>
              {detail?.topic && (
                <span className={cls.topic_badge}>{detail.topic}</span>
              )}
              <h1>{detail?.title}</h1>
              <p className={cls.detail_desc}>{detail?.description}</p>

              <div className={cls.detail_meta_row}>
                {detail?.hasScore && detail?.maxScore != null && (
                  <span className={cls.meta_pill}>
                    <IoStar className={cls.star_icon} /> {detail.maxScore} баллов
                  </span>
                )}
                {dateValue && (
                  <span className={cls.meta_pill}>
                    <IoCalendarOutline />{" "}
                    {detail?.deadline ? "До " : ""}
                    {new Date(dateValue).toLocaleDateString("ru-RU")}
                  </span>
                )}
                {detail?.topic && (
                  <span className={cls.meta_pill}>
                    <IoBookOutline /> {detail.topic}
                  </span>
                )}
                {detail?.isBonus && (
                  <span className={cls.meta_pill_bonus}>
                    <IoGiftOutline /> Бонусное
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={cls.detail_cards_row}>
            <div className={cls.info_card}>
              <div className={cls.info_card_title}>
                <IoListOutline className={cls.info_icon} />
                <h3>Требования к выполнению</h3>
              </div>

              {requirements.length > 0 ? (
                <ul className={cls.req_list}>
                  {requirements.map((req, idx) => (
                    <li key={idx}>
                      <IoCheckmarkCircle className={cls.req_check} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={cls.info_fallback}>
                  {detail?.description || "Выполните задание и прикрепите ссылку на решение."}
                </p>
              )}
            </div>

            <div className={cls.info_card}>
              <div className={cls.info_card_title}>
                <IoAttachOutline className={cls.info_icon} />
                <h3>Материалы</h3>
              </div>

              {hasMaterials ? (
                <div className={cls.materials_list}>
                  {detail?.exampleLink && (
                    <a
                      href={detail.exampleLink}
                      target="_blank"
                      rel="noreferrer"
                      className={cls.material_link}
                    >
                      <span>Пример реализации</span>
                      <IoOpenOutline />
                    </a>
                  )}
                  {detail?.attachmentLink && (
                    <a
                      href={detail.attachmentLink}
                      target="_blank"
                      rel="noreferrer"
                      className={cls.material_link}
                    >
                      <span>Материалы к заданию</span>
                      <IoOpenOutline />
                    </a>
                  )}
                </div>
              ) : (
                <p className={cls.info_fallback}>Дополнительные материалы не прикреплены</p>
              )}
            </div>
          </div>

          {submission && (
            <div className={cls.submissions_card}>
              <div className={cls.info_card_title}>
                <IoTimeOutline className={cls.info_icon} />
                <h3>Мои отправки</h3>
              </div>

              <div className={cls.submission_row}>
                <div className={cls.submission_info}>
                  <span
                    className={`${cls.submission_status} ${cls[`sub_${statusMeta.key}`]}`}
                  >
                    <IoCheckmarkCircle /> {statusMeta.label}
                  </span>

                  <span className={cls.submission_meta}>
                    {submission?.updatedAt || submission?.createdAt
                      ? `От ${new Date(
                          submission.updatedAt || submission.createdAt,
                        ).toLocaleString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`
                      : ""}
                    {submission?.score != null &&
                      ` • Оценка: ${submission.score}${
                        detail?.maxScore != null ? `/${detail.maxScore}` : ""
                      }`}
                  </span>
                </div>

                {submission?.solutionLink && (
                  <button
                    type="button"
                    className={cls.btn_view_sub}
                    onClick={() => window.open(submission.solutionLink, "_blank")}
                  >
                    Просмотреть
                  </button>
                )}
              </div>

              {submission?.reviewerComment && (
                <p className={cls.reviewer_comment}>
                  Комментарий ментора: {submission.reviewerComment}
                </p>
              )}
            </div>
          )}
        </div>

        <div className={cls.detail_right}>
          <div className={cls.submit_card_header}>
            <div className={cls.submit_icon_wrap}>
              <IoCloudUploadOutline />
            </div>
            <h3>
              {submission?.status === "REVISION"
                ? "Повторная отправка"
                : "Отправка решения"}
            </h3>
          </div>

          {canSubmit ? (
            <form className={cls.modal_form} onSubmit={handleSubmit}>
              <div className={cls.upload_box}>
                <IoCloudUploadOutline className={cls.upload_big_icon} />
                <p className={cls.upload_hint}>
                  Вставьте ссылку на решение (GitHub, Figma, Vercel...)
                </p>
                <input
                  type="text"
                  placeholder="https://github.com/..."
                  value={solutionLink}
                  onChange={(e) => setSolutionLink(e.target.value)}
                  required
                />
              </div>

              <div className={cls.field_group}>
                <label>Комментарий (необязательно)</label>
                <textarea
                  rows={4}
                  placeholder="Напишите комментарий к работе..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button type="submit" disabled={loading} className={cls.submit_btn}>
                {loading
                  ? "Отправка..."
                  : submission?.status === "REVISION"
                    ? "Отправить доработку"
                    : "Отправить задание"}
                <FaArrowRight />
              </button>
            </form>
          ) : (
            <div className={cls.submitted_locked}>
              <IoCheckmarkCircle className={cls.locked_icon} />
              <p className={cls.locked_title}>{statusMeta.label}</p>
              <p className={cls.locked_desc}>
                Задание уже отправлено. Повторная отправка будет доступна только если ментор вернёт работу на доработку.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
