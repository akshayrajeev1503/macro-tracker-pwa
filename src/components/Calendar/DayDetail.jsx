import React from 'react';

export default function DayDetail({ entry }) {
  if (!entry) return <div>No entry for this day.</div>;
  const { image, macros } = entry;
  return (
    <div>
      <img src={image} alt="Food" style={{ maxWidth: '100%' }} />
      <h4>Macros</h4>
      <ul>
        <li>Calories: {macros.calories}</li>
        <li>Protein: {macros.protein} g</li>
        <li>Carbs: {macros.carbs} g</li>
        <li>Fats: {macros.fats} g</li>
      </ul>
    </div>
  );
}
