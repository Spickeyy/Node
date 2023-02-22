import MovieModel from './movie-model';

const movies: MovieModel[] = [
  {
    id: '1',
    title: 'Titanic',
    location: {
      country: 'USA',
    },
    images: [
      'https://deadline.com/wp-content/uploads/2021/02/MCDTITA_FE014.jpg?w=681&h=383&crop=1',
      'https://static-koimoi.akamaized.net/wp-content/new-galleries/2023/01/james-cameron-explains-the-door-situation-in-titanic-while-talking-about-the-debate-whether-it-was-possible-to-save-jack-01.jpg',
      'https://cst.brightspotcdn.com/dims4/default/dad6125/2147483647/strip/true/crop/3424x2283+0+298/resize/1680x1120!/format/webp/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2F_mcXuZPHFwDiKLyiKGICkhVVGB0%3D%2F0x0%3A3424x4500%2F3424x4500%2Ffilters%3Afocal%281832x1439%3A1833x1440%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24412063%2FFilm_Titanic_3_D.JPG',
    ],
    price: 1843478449,
    rating: 4,
  },
  {
    id: '2',
    title: 'Avatar',
    location: {
      country: 'USA',
    },
    images: [
      'https://image.cnbcfm.com/api/v1/image/105897632-1557241558937avatar-e1541360922907.jpg?v=1664130328&w=740&h=416&ffmt=webp&vtcrop=y',
      'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2022-11/avatar-mc-221123-02-78d2b5.jpg',
      'https://www.usmagazine.com/wp-content/uploads/2022/04/The-Way-of-Water.jpg?w=1600&quality=86&strip=all',
    ],
    price: 289938410200.00,
    rating: 3,
  },
  {
    id: '3',
    title: 'Avatar: The Way of Water',
    location: {
      country: 'USA',
    },
    images: [
      'https://static01.nyt.com/images/2022/12/13/multimedia/13avatar-fx-1-3a70/13avatar-fx-1-3a70-superJumbo.jpg?quality=75&auto=webp',
      'https://hips.hearstapps.com/hmg-prod/images/avatar-the-way-of-water-1670943667.jpeg?crop=0.999383096853794xw:1xh;center,top&resize=1200:*',
      'https://www.hollywoodreporter.com/wp-content/uploads/2022/11/2363A_0070_v0550.1080K.jpg?w=1296&h=730&crop=1',
    ],
    price: 2207986545,
    rating: 4,
  },
  {
    id: '4',
    title: 'The Nice Guys',
    location: {
      country: 'USA',
    },
    images: [
      'https://jonnegroni.com/wp-content/uploads/2016/05/wadvfcubygn6zcjcnc1qcu3hro.jpg?w=798',
      'https://media.architecturaldigest.com/photos/573f7659e18d84ab23926dcc/master/w_2580%2Cc_limit/tour-set-shane-blacks-latest-movie-the-nice-guys-starring-ryan-gosling-russell-crowe-01.jpg',
      'https://film-grab.com/wp-content/uploads/2019/03/niceguys020.jpg',
    ],
    price: 59596747,
    rating: 3,
  },
  {
    id: '5',
    title: 'The Last Samurai',
    location: {
      country: 'Japan',
    },
    images: [
      'https://upload.wikimedia.org/wikipedia/en/c/c6/The_Last_Samurai.jpg',
      'https://www.hollywoodreporter.com/wp-content/uploads/2018/10/the_last_samurai_-_h_-_2003.png?w=1296&h=730&crop=1',
      'https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/4/2015/04/last-samurai-1024x576.jpg',
    ],
    price: 456810575,
    rating: 4,
  },
  {
    id: '6',
    title: 'Prey',
    location: {
      country: 'Canada',
    },
    images: [
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/amber-midthunder-prey-dane-diliegro-1658478937.jpg?resize=768:*',
      'https://imageio.forbes.com/specials-images/imageserve/62ea8df4dbbfdb8824b68630/Naru--Amber-Midthunder--in-Prey/960x0.jpg?format=jpg&width=960',
      'https://westernnews.media.clients.ellingtoncms.com/img/photos/2022/07/26/predator_film02_t670.jpg?b3f6a5d7692ccc373d56e40cf708e3fa67d9af9d',
    ],
    price: 160000000,
    rating: 3,
  },
  {
    id: '7',
    title: 'The Northman',
    location: {
      country: 'Ireland',
    },
    images: [
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781647227777/the-northman-9781647227777_lg.jpg',
      'https://variety.com/wp-content/uploads/2021/12/The-Northman-2.jpg?w=681&h=383&crop=1',
      'https://www.goldderby.com/wp-content/uploads/2022/04/the-northman-alexander-skarsgard.jpg?w=620&h=360&crop=1',
    ],
    price: 69441889,
    rating: 3,
  },
  {
    id: '8',
    title: "Don't look up",
    location: {
      country: 'USA',
    },
    images: [
      'https://ucsdguardian.org/wp-content/uploads/2022/01/Dont-Look-Up-courtesy-of-ComicBook.com_-752x440.jpeg',
      'https://www.denofgeek.com/wp-content/uploads/2021/12/dont-look-up-review.jpg?resize=768%2C432',
      'https://pyxis.nymag.com/v1/imgs/67c/ce5/ce68bde0ac7f766bac806af0e2eed86a81-dont-look-up.2x.rhorizontal.w700.jpg',
    ],
    price: 762858,
    rating: 3,
  },
  {
    id: '9',
    title: 'Dune',
    location: {
      country: 'United Arab Emirates',
    },
    images: [
      'https://static01.nyt.com/images/2021/10/20/arts/20dune-review1/20dune-review1-superJumbo.jpg?quality=75&auto=webp',
      'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2021_42/3514418/211022-dune-al-1229.jpg',
      'https://www.dolby.com/siteassets/xf-site/content-detail-pages/dune_in_dolby_poster.jpg',
    ],
    price: 392073640,
    rating: 4,
  },
  {
    id: '10',
    title: 'No Time To Day',
    location: {
      country: 'Italy',
    },
    images: [
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2020%2F01%2Fjb_nttd_1_76342783498439843-2000.jpg&w=1100&h=737&c=sc&poi=face&q=60',
      'https://www.bondsuits.com/wp-content/uploads/2022/02/no-time-to-die-massimo-alba-duster-connolly-finamore-shirt.jpg',
      'https://www.cnet.com/a/img/resize/85703b40aa7174c79d0d29f68c7c80c64a3c426d/hub/2020/01/30/aec9256b-1d70-42ec-9356-d12316f8c442/09.jpg?auto=webp&fit=crop&height=675&width=1200',
    ],
    price: 759959662,
    rating: 3,
  },
  {
    id: '11',
    title: 'Extraction',
    location: {
      country: 'India',
    },
    images: [
      'https://static-koimoi.akamaized.net/wp-content/new-galleries/2021/07/chris-hemsworths-extraction-2-to-take-place-on-the-streets-of-sydney-this-time-001.jpg',
      'https://hips.hearstapps.com/hmg-prod/images/d-unit-08561-r-1588022260.jpg?crop=0.668xw:1.00xh;0.0952xw,0&resize=1200:*',
      'https://static.tvtropes.org/pmwiki/pub/images/adef73a7_b685_43fa_b261_e3d8e18db611.jpeg',
    ],
    price: 65000000,
    rating: 2,
  },
  {
    id: '12',
    title: 'Everything Everywhere All at Once',
    location: {
      country: 'USA',
    },
    images: [
      'https://cdn.vox-cdn.com/thumbor/Yom7Lt5qn69qt0iLCr-rfgcBKeo=/0x0:1052x1500/1820x1213/filters:focal(388x359:556x527):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/71761991/sWN1bP08KXuzlBwsO0T0HJEeIy9.0.jpg',
      'https://compote.slate.com/images/570836f4-6afd-48cc-b39e-9ad93cd73bf2.jpeg?crop=1872%2C1248%2Cx1128%2Cy209&width=2200',
      'https://cdn.theatlantic.com/thumbor/KZhFwMpFlppo4v7f1boC2m4JDwo=/0x0:5466x3075/1952x1098/media/img/mt/2022/03/https_cdn.sanity.io_images_xq1bjtf4_production_65f9a0af7f43991ea4887b8ddf1fa11efbe29eb0_5466x3075/original.jpg',
    ],
    price: 106879147,
    rating: 4,
  },
];

export default movies;
