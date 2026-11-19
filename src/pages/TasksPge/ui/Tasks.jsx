import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import cls from "../styles/task.module.scss";
import {
  IoBookOutline,
  IoCalendarOutline,
  IoCheckmark,
  IoClipboardOutline,
  IoCodeSlash,
  IoColorPaletteOutline,
  IoSearch,
  IoStar,
  IoStatsChart,
} from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";

const STATUS_META = {
  SENT: { label: "Отправлено", key: "review" },
  IN_REVIEW: { label: "На проверке", key: "review" },
  REVISION: { label: "На доработку", key: "revision" },
  ACCEPTED: { label: "Принято", key: "accepted" },
};

const FILTERS = [
  { id: "ALL", label: "Все" },
  { id: "NEW", label: "Новые" },
  { id: "REVIEW", label: "На проверке" },
  { id: "REVISION", label: "На доработку" },
  { id: "ACCEPTED", label: "Принятые" },
];

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

const getTaskStatus = (t) => (t?.mySubmission || t?.submission)?.status;

export const TaskS = ({ datas }) => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [filter, setFilter] = useState("ALL");
  const [query, setQuery] = useState("");
  const tasks = Array.isArray(datas) ? datas : datas?.tasks || [];

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const counts = useMemo(() => {
    const res = { ALL: tasks.length, NEW: 0, REVIEW: 0, REVISION: 0, ACCEPTED: 0 };
    tasks.forEach((t) => {
      const status = getTaskStatus(t);
      if (!status) res.NEW += 1;
      else if (status === "SENT" || status === "IN_REVIEW") res.REVIEW += 1;
      else if (status === "REVISION") res.REVISION += 1;
      else if (status === "ACCEPTED") res.ACCEPTED += 1;
    });
    return res;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const status = getTaskStatus(t);
      const matchesFilter =
        filter === "ALL" ||
        (filter === "NEW" && !status) ||
        (filter === "REVIEW" && (status === "SENT" || status === "IN_REVIEW")) ||
        status === filter;

      if (!matchesFilter) return false;
      if (!q) return true;

      return (
        t?.title?.toLowerCase().includes(q) ||
        t?.description?.toLowerCase().includes(q) ||
        t?.topic?.toLowerCase().includes(q)
      );
    });
  }, [tasks, filter, query]);

  return (
    <div className={cls.TaskS}>
      <div className={cls.header_row}>
        <div className={cls.header_left}>
          <div className={cls.header_icon}>
            <IoClipboardOutline />
          </div>
          <div>
            <h1>Задания</h1>
            <p>Выполняй задания, получай баллы и развивайся!</p>
          </div>
        </div>

        <div className={cls.search_box}>
          <IoSearch className={cls.search_icon} />
          <input
            ref={searchRef}
            type="text"
            placeholder="Поиск по заданиям..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className={cls.shortcut_badge}>⌘ K</span>
        </div>
      </div>

      <div className={cls.filters_bar}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={filter === f.id ? cls.active_btn : cls.filter_btn}
            onClick={() => setFilter(f.id)}
          >
            <span>{f.label}</span>
            <span className={cls.filter_count}>{counts[f.id]}</span>
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <div className={cls.empty_filter}>
          <p>В этой категории пока нет заданий</p>
        </div>
      ) : (
        <div className={cls.task_list}>
          {filteredTasks.map((t) => {
            const submission = t?.mySubmission || t?.submission;
            const meta = STATUS_META[submission?.status] || {
              label: "Новая",
              key: "new",
            };
            const isPrimaryAction = !submission || submission?.status === "REVISION";
            const dateValue = t?.deadline || t?.createdAt;

            return (
              <div
                key={t.id}
                className={`${cls.task_card} ${cls[`card_${meta.key}`]}`}
                data-aos="fade-up"
                onClick={() => navigate(`/tasks/${t.id}`)}
              >
                <div className={cls.card_icon_wrap}>
                  <div className={cls.card_icon_box}>{getTaskIcon(t?.topic)}</div>
                </div>

                <div className={cls.card_main}>
                  {t?.topic && (
                    <span className={cls.topic_badge}>{t.topic}</span>
                  )}
                  <h3>{t?.title}</h3>
                  <p>{t?.description}</p>

                  <div className={cls.card_meta}>
                    {t?.topic && (
                      <span className={cls.meta_item}>
                        <IoBookOutline /> {t.topic}
                      </span>
                    )}
                    {dateValue && (
                      <span className={cls.meta_item}>
                        <IoCalendarOutline />{" "}
                        {t?.deadline ? "До " : ""}
                        {new Date(dateValue).toLocaleDateString("ru-RU")}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={cls.card_right}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={cls.card_right_top}>
                    {t?.hasScore && t?.maxScore != null && (
                      <span className={cls.score_inline}>
                        <IoStar className={cls.star_icon} /> {t.maxScore} баллов
                      </span>
                    )}

                    <span
                      className={`${cls.status_pill} ${cls[`pill_${meta.key}`]}`}
                    >
                      {meta.key === "accepted" ? (
                        <IoCheckmark />
                      ) : (
                        <span className={cls.status_dot} />
                      )}
                      {meta.label}
                    </span>

                    <button
                      className={
                        isPrimaryAction ? cls.btn_primary : cls.btn_secondary
                      }
                      onClick={() => navigate(`/tasks/${t.id}`)}
                    >
                      {submission?.status === "REVISION"
                        ? "Доработать"
                        : submission?.status === "ACCEPTED"
                          ? "Просмотр"
                          : submission
                            ? "Открыть"
                            : "Выполнить"}
                      <FaArrowRight />
                    </button>
                  </div>

                  {submission?.score != null && (
                    <span className={cls.earned_badge}>+{submission.score}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
