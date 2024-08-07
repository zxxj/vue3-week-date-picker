<template>
	<div class="weekly-calendar">
		<div class="currentYearAndMonth">
			{{ showMonth }}
		</div>
		<div class="controls">
			<img src="/src/assets/prev.png" class="prev-btn" @click="prevWeek" />
			<img src="/src/assets/next.png" class="next-btn" @click="nextWeek" />
		</div>
		<div class="days">
			<div class="day-labels">
				<div class="day-label">一</div>
				<div class="day-label">二</div>
				<div class="day-label">三</div>
				<div class="day-label">四</div>
				<div class="day-label">五</div>
				<div class="day-label">六</div>
				<div class="day-label">日</div>
			</div>
			<div class="day-cells">
				<div class="day-cell" v-for="(day, index) in days" :key="index"
					:class="{ today: (isToday(day) && !checkIndex) || checkIndex === index, 'not-in-month': !isInMonth(day) }">
					<div class="day-number" @click="clickDays(index, day)">{{ format(day, "dd") }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { format } from 'date-fns';

const currentWeek = ref({ start: null, end: null });
const checkIndex = ref(null);
const showMonth = ref(null);

const days = computed(() => {
	const daysArray = [];
	const weekStart = currentWeek.value.start;
	const weekEnd = currentWeek.value.end;
	if (weekStart && weekEnd) {
		const diff = (weekEnd.getTime() - weekStart.getTime()) / (24 * 60 * 60 * 1000);
		for (let i = 0; i <= diff; i++) {
			const day = new Date(weekStart.getTime() + i * 24 * 60 * 60 * 1000);
			daysArray.push(day);
		}
	}
	return daysArray;
});

const setToday = () => {
	const firstDayOfWeek = 1;
	const today = new Date();
	const currentWeekStart = new Date(today.getTime() - (today.getDay() - firstDayOfWeek) * 24 * 60 * 60 * 1000);
	currentWeek.value.start = currentWeekStart;
	currentWeek.value.end = new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
	seShowMonth(currentWeek.value.start);
};

const seShowMonth = (day) => {
	showMonth.value = format(day, "yyyy/MM");
};

const clickDays = (index, day) => {
	checkIndex.value = index;
	seShowMonth(day);
};

const prevWeek = () => {
	checkIndex.value = null;
	const firstDayOfWeek = 1;
	const weekStart = currentWeek.value.start;
	const prevWeekStart = new Date(weekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
	currentWeek.value.start = new Date(prevWeekStart.getTime() - (prevWeekStart.getDay() - firstDayOfWeek) * 24 * 60 * 60 * 1000);
	currentWeek.value.end = new Date(currentWeek.value.start.getTime() + 6 * 24 * 60 * 60 * 1000);
	checkIndex.value = 3;
	const day = new Date(currentWeek.value.end.getTime() - 3 * 24 * 60 * 60 * 1000);
	seShowMonth(day);
};

const nextWeek = () => {
	checkIndex.value = null;
	const firstDayOfWeek = 0;
	const weekEnd = currentWeek.value.end;
	const nextWeekEnd = new Date(weekEnd.getTime() + 7 * 24 * 60 * 60 * 1000);
	currentWeek.value.end = new Date(nextWeekEnd.getTime() + (firstDayOfWeek - nextWeekEnd.getDay()) * 24 * 60 * 60 * 1000);
	currentWeek.value.start = new Date(currentWeek.value.end.getTime() - 6 * 24 * 60 * 60 * 1000);
	checkIndex.value = 3;
	const day = new Date(currentWeek.value.start.getTime() + 3 * 24 * 60 * 60 * 1000);
	seShowMonth(day);
};

const isToday = (date) => {
	const today = new Date();
	return date.toDateString() === today.toDateString();
};

const isInMonth = (date) => {
	return format(date, "yyyy/MM") === showMonth.value;
};

setToday();
</script>

<style scoped>
.weekly-calendar {
	max-width: 270px;
	margin: 0 auto;
	font-family: Arial, sans-serif;
}

.weekly-calendar h2 {
	text-align: center;
}

.weekly-calendar .controls {
	position: relative;
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
}

.weekly-calendar .day-labels {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}

.weekly-calendar .day-label {
	flex: 1;
	text-align: center;
	font-size: 14px;
	font-weight: bold;
}

.weekly-calendar .day-cells {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}

.weekly-calendar .day-cell {
	flex: 1;
	text-align: center;
	font-size: 14px;
	cursor: pointer;
	transition: all .5s;
}

.weekly-calendar .today {
	background: #DE2C05;
	border-radius: 4px;
	color: #fff;
}

.weekly-calendar .not-in-month {
	color: #ccc;
}

.day-number {
	padding: 10px;
}

.prev-btn,
.next-btn {
	position: absolute;
}

.prev-btn {
	top: 35px;
	left: -40px;
}

.next-btn {
	top: 35px;
	right: -40px;
}

.currentYearAndMonth {
	text-align: center;
}
</style>