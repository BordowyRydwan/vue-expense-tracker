import Vue from 'vue';
import Router from 'vue-router';
import ExpenseForm from './views/ExpenseForm.vue';
import IncomeForm from './views/IncomeForm.vue';
import Summary from './views/Summary.vue';
import Settings from './views/Settings.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/expenses',
            name: 'Expenses',
            component: ExpenseForm
        },

        {
            path: '/incomes',
            name: 'Incomes',
            component: IncomeForm,
        },
        {
            path: '/',
            name: 'Summary',
            component: Summary,
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings,
        },
    ]
})