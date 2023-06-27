import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const list = {
  visible: {
    opacity: 1,
    y: 0,
    // transition: {
      // type: 'tween',
      // duration: 0.5,
    // }

  },
  hidden: {
    opacity: 0,
    y: 50
  }
}

export const CompanyTableItem = ({ name, email, phone, tags, url, status, onChange, onClick, id }) => {
  useEffect(() => {
    const storedStatus = localStorage.getItem(name);
    if (storedStatus && status !== storedStatus) {
      onChange({ target: { value: storedStatus } }, name);
    }
  }, [name, status, onChange]);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    onChange(event, name);
    localStorage.setItem(name, newStatus);
  };
  // console.log(status)
  return (
    <motion.tr
      className="border-neutral-800/60"
      variants={list}
      initial="hidden"
      animate="visible"
      transition={{
        delay:  0.1 * id % 0.7,
        type: 'tween',
        duration: 0.3
      }}
      >
      <td className="w-1/5">
        <a href={url} target="_blank" className="text-lg font-bold text-neutral-50 transition hover:text-violet-600">
          {name}
        </a>
      </td>

      <td className="w-1/5">
        <div className="text-md mb-1 font-semibold text-neutral-300">{email}</div>
        <div className=" text-md font-semibold text-neutral-300">{phone}</div>
      </td>

      <td className="my-3 flex w-auto flex-wrap items-center gap-2">
        {tags.map((tag, index) => {
          return (
            <button key={index} onClick={() => onClick(tag.toLowerCase())} className="rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 px-2 py-1 text-center text-sm font-semibold text-neutral-50 hover:from-purple-700 hover:to-violet-800">
              {tag}
            </button>
          );
        })}
      </td>

      <td className="w-1/5">
        <select onChange={handleStatusChange} value={status} className="text-md trunkate select -ml-4 w-full max-w-xs bg-neutral-900 font-semibold text-neutral-300">
          <option value="status2">
            Wybierz status
          </option>
          <option value="Wysłane CV">Wysłane CV</option>
          <option value="Zaplanowana rozmowa">Zaplanowana rozmowa</option>
          <option value="Po rozmowie">Po rozmowie</option>
          <option value="Oczekiwanie na decyzję">Oczekiwanie na decyzję</option>
          <option value="Odrzucone">Odrzucone</option>
        </select>
      </td>
    </motion.tr>
  );
};
