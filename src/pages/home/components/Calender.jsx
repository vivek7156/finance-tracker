import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Calendar = ({ highlights }) => {
  return (
    <Card className="col-span-1"> {/* Updated grid span */}
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-xs md:text-sm">
          {/* Weekday headers */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-gray-500 p-1">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded-full text-sm
                ${highlights.includes(i + 1)
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
                }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;