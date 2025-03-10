import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const people = [
  { name: "Eddie Lobanovskiy", email: "laboanovskiy@gmail.com", avatar: "/eddie.png" },
  { name: "Alexey Stave", email: "alexeyst@gmail.com", avatar: "/alexey.png" },
  { name: "Anton Tkachev", email: "tkacheveanton@gmail.com", avatar: "/anton.png" },
];

export default function CalendarSidebar() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSchedule = () => {
    alert(`Schedule created for ${selectedDate.toDateString()}`);
  };

  return (
    <motion.div 
      className="w-full md:w-96 h-full bg-background-card p-6 text-text flex flex-col gap-6 border border-border dark:border-border-dark rounded-lg"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Create Schedule Button */}
      <button 
        className="w-full bg-primary text-white py-2 px-4 rounded-lg shadow hover:bg-primary-dark flex items-center justify-center"
        onClick={handleSchedule}
      >
        <Plus className="mr-2" /> Create Schedule
      </button>

      {/* Calendar Component */}
      <div className="bg-background-hover p-4 rounded-lg shadow border border-border text-text-muted text-center">
        <Calendar 
          onChange={setSelectedDate} 
          value={selectedDate} 
          className="!bg-background-card !text-text !border-none !rounded-lg shadow-md"
        />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-text-muted" size={16} />
        <input 
          className="w-full bg-background-hover text-text pl-10 py-2 border border-border-dark rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="Search" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      {/* People List */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-text">People</h3>
        <div className="flex flex-col gap-3">
          {filteredPeople.length > 0 ? (
            filteredPeople.map((person, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-3 bg-background-hover p-3 rounded-lg shadow-md border border-border hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
              >
                <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                <div>
                  <p className="text-sm font-medium text-text">{person.name}</p>
                  <p className="text-xs text-text-muted">{person.email}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-text-muted text-sm">No results found</p>
          )}
        </div>
      </div>

      {/* My Schedule Button */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <button className="w-full border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary-light">
          My Schedule
        </button>
      </motion.div>
    </motion.div>
  );
}
