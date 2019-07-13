
const regEx = {
    name : /^[a-zA-Z ]*$/,
    phone : /^[6789]\d{9}$/,
    email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    reset_mode : /^(email|phone)$/,
    login_role : /^(manager|staff|owner)$/,
    otp : /^\d{6}$/,
    outlet_status : /^(online|disabled|payment_link)$/,
    gender: /^(male|female|trans)$/,
    ratecard_gender: /^(male|female|unisex)$/,
    date_format: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
    tax_calculation : /^(include|exclude)$/,
    staff_service_status: /^(yes|no)$/,
    appointment_status: /^(pending|confirmed|started|completed|cancelled|refunded|expiried|rejected)$/,
    amount_mode : /^(percentage|flat)$/,
    item_type : /^(service|membership|product)$/,
    plan_currency: /^(INR)$/,
    plan_period: /^(daily|weekly|monthly|yearly)$/,
    subscription_status: /^(created|authenticated|active|pending|halted|cancelled|completed|expired)$/,
    user_filter: /^(all|male|female|month_booking)$/,
    month_format: /^[0-9]{4}-(0[1-9]|1[0-2])$/,
}

export default regEx