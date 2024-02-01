const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Candidate = sequelize.define('candidate', {
    candidate_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    active_details: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    area_code1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    area_code2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avb_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    birth_place: {
        type: Sequelize.STRING,
        allowNull: false
    },
    boiler_suit_size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    company_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdby: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cr_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    cr_time: {
        type: Sequelize.TIME,
        allowNull: false
    },
    c_ad1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_ad2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_mobi1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_mobi2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_pin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_rank: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_tel1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_tel2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    c_vessel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATE,
        allowNull: false
    },
    editedby: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email2: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    experience: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    grade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    height: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imp_discussion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    indos_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ipadress: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:"ip"
    },
    joined_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    last_company: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_salary: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue:"0"
    },
    last_time: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"0"
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    l_country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mem_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile_code1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile_code2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    m_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: false
    },
    other_mobile_code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    other_numbers: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photos: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_ad1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_ad2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_mobi1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_mobi2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_pin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_rank: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_tel1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    p_tel2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ref_check: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resume: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resume_upload_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    safety_shoe_size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    skype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stcw: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vendor_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weight: {
        type: Sequelize.STRING,
        allowNull: false
    },
    work_nautilus: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zone: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Candidate;
