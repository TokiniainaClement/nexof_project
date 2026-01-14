import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AgendaCalendar = ({ selectedDate = new Date(), onDateSelect, eventsOnDates = new Set() }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const hasEvent = (day) => {
    return eventsOnDates.has(day);
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(newDate);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div className="backdrop-blur-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent border border-cyan-500/50 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-cyan-400" />
        </button>
        <h3 className="text-lg font-bold text-cyan-300">
          {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-cyan-400/70 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="aspect-square">
            {day ? (
              <button
                onClick={() => handleDateClick(day)}
                className={`w-full h-full flex items-center justify-center text-sm rounded transition-all duration-200 ${
                  isSelected(day)
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/50'
                    : isToday(day)
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                    : hasEvent(day)
                    ? 'hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                    : 'hover:bg-cyan-500/10 text-cyan-400'
                }`}
              >
                {day}
                {hasEvent(day) && !isSelected(day) && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                )}
              </button>
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaCalendar;