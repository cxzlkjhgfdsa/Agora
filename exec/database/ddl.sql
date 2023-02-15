create table if not exists localagora.black_list
(
    id         bigint       not null
        primary key auto_increment,
    user_id    varchar(255) null,
    user_phone varchar(255) null
);

create table if not exists localagora.category
(
    category_id    bigint       not null
        primary key auto_increment,
    category_image varchar(100) null,
    category_name  varchar(50)  null
);

create table if not exists localagora.debate_history
(
    debate_history_id      bigint       not null
        primary key auto_increment,
    category               varchar(30)  null,
    left_opinion           varchar(50)  null,
    left_player1_nickname  varchar(30)  null,
    left_player2_nickname  varchar(30)  null,
    left_player3_nickname  varchar(30)  null,
    phase1_left_vote       int          null,
    phase1_player_result   varchar(50)  null,
    phase1_right_vote      int          null,
    phase2_left_vote       int          null,
    phase2_player_result   varchar(50)  null,
    phase2_right_vote      int          null,
    phase3_left_vote       int          null,
    phase3_player_result   varchar(50)  null,
    phase3_right_vote      int          null,
    right_opinion          varchar(50)  null,
    right_player1_nickname varchar(30)  null,
    right_player2_nickname varchar(30)  null,
    right_player3_nickname varchar(30)  null,
    room_name              varchar(100) null,
    total_player_result    varchar(50)  null,
    user_id                varchar(50)  null,
    user_team              varchar(10)  null
);

create table if not exists localagora.encrypt
(
    user_security_id bigint auto_increment
        primary key,
    salt             varchar(100) null,
    user_social_id   varchar(100) null
);

create table if not exists localagora.hibernate_sequence
(
    next_val bigint null
);

create table if not exists localagora.report
(
    id                bigint       not null
        primary key auto_increment,
    report_content    varchar(100) null,
    reported_user_id  varchar(255) null,
    reporting_user_id varchar(255) null
);

create table if not exists localagora.room
(
    room_id            bigint auto_increment
        primary key,
    room_category      varchar(255) null,
    room_creater_name  varchar(100) null,
    room_debate_type   varchar(255) null,
    room_hashtags      varchar(200) null,
    room_name          varchar(100) null,
    room_opinion_left  varchar(50)  null,
    room_opinion_right varchar(50)  null,
    room_start_time    bigint       null,
    room_state         bit          null,
    room_thumbnail_url varchar(255) null,
    room_watch_cnt     int          null
);

create table if not exists localagora.users
(
    user_id                  varchar(50)  not null
        primary key,
    report_count             int          not null,
    user_age                 varchar(30)  null,
    user_name                varchar(100) null,
    user_nickname            varchar(30)  null,
    user_phone               varchar(100) null,
    user_photo               varchar(200) null,
    user_photo_name          varchar(200) null,
    user_social_id           varchar(50)  null,
    user_social_type         varchar(30)  null,
    encrypt_user_security_id bigint       null,
    constraint UK_r7e3xe2uqjaef83lw9tpmc8ql
        unique (user_nickname),
    constraint FKdf59o2uk813ytjs4qtfksq836
        foreign key (encrypt_user_security_id) references localagora.encrypt (user_security_id)
);

create table if not exists localagora.user_category
(
    user_category_id bigint auto_increment
        primary key,
    category_id      bigint      null,
    user_id          varchar(50) null,
    constraint FKh1fip9lpe4alrpurxqfmpftvl
        foreign key (user_id) references localagora.users (user_id),
    constraint FKjchjxphkf5owj1i5bp95g5mfs
        foreign key (category_id) references localagora.category (category_id)
);