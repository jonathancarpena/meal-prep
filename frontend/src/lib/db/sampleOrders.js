import moment from "moment"
export default [
    {
        order_id: 1,
        date_placed: moment(Date.now()),
        customer: {
            first_name: 'Maddy',
            last_name: 'Bea',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 }
        ],
        reserved_date: moment(Date.now()).add(1, 'week'),
        completed: false,
    },
    {
        order_id: 2,
        date_placed: moment(Date.now()).subtract(1, 'week'),
        customer: {
            first_name: 'John',
            last_name: 'Clark',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 }
        ],
        reserved_date: moment(Date.now()).add(2, 'week'),
        completed: false,
    },
    {
        order_id: 3,
        date_placed: moment(Date.now()),
        customer: {
            first_name: 'Eduardo',
            last_name: 'Johnson',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 }
        ],
        reserved_date: moment(Date.now()).add(1, 'week'),
        completed: false,
    },
    {
        order_id: 4,
        date_placed: moment(Date.now()),
        customer: {
            first_name: 'Kevin',
            last_name: 'Alex',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 }
        ],
        reserved_date: moment(Date.now()).add(2, 'week'),
        completed: true,
    },
    {
        order_id: 5,
        date_placed: moment(Date.now()),
        customer: {
            first_name: 'Toby',
            last_name: 'Elson',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 }
        ],
        reserved_date: moment(Date.now()).add(2, 'week'),
        completed: true,
    },
    {
        order_id: 6,
        date_placed: moment(Date.now()),
        customer: {
            first_name: 'Max',
            last_name: 'Schneider',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 }
        ],
        reserved_date: moment(Date.now()).add(2, 'week'),
        completed: true,
    },
    {
        order_id: 7,
        date_placed: moment(Date.now()),
        customer: {
            first_name: 'Victoria',
            last_name: 'Thanos',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 }
        ],
        reserved_date: moment(Date.now()).add(2, 'week'),
        completed: true,
    },
    {
        order_id: 8,
        date_placed: moment(Date.now()),
        customer: {
            first_name: 'Bruce',
            last_name: 'Thor',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 }
        ],
        reserved_date: moment(Date.now()).add(2, 'week'),
        completed: true,
    },
    {
        order_id: 9,
        date_placed: moment(Date.now()),
        customer: {
            first_name: 'Son',
            last_name: 'Goku',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 }
        ],
        reserved_date: moment(Date.now()).add(2, 'week'),
        completed: true,
    },
    {
        order_id: 10,
        date_placed: moment(Date.now()),
        customer: {
            first_name: 'Midoriya',
            last_name: 'Deku',
            email: 'meggymegs@email.com'
        },
        items: [
            { _id: 1, qty: 2 },
            { _id: 2, qty: 3 },
            { _id: 3, qty: 1 },
        ],
        reserved_date: moment(Date.now()).add(2, 'week'),
        completed: true,
    },
]