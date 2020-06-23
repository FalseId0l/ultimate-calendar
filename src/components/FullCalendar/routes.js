import DayView from "components/FullCalendar/components/DayView/DayView";
import WeekView from "components/FullCalendar/components/WeekView/WeekView";
import MonthView from "components/FullCalendar/components/MonthView/MonthView";
import YearView from "components/FullCalendar/components/YearView/YearView";

var routes = [
    {
        type: "Day",
        path: "/dayview",
        name: "DayView",
        component: DayView,
        layout: "/calendar"
    },
    {
        type: "Week",
        path: "/weekview",
        name: "WeekView",
        component: WeekView,
        layout: "/calendar"
    },
    {
        type: "Month",
        path: "/monthview",
        name: "MonthView",
        component: MonthView,
        layout: "/calendar"
    },
    {
        type: "Year",
        path: "/yearview",
        name: "YearView",
        component: YearView,
        layout: "/calendar"
    }
];
export default routes;
