import React, { useMemo, useState } from 'react';
import { MainLayout } from './MainLayout';
import { ReactComponent as ChurchIcon } from '../assets/church.svg';
import { ReactComponent as CollectionsIcon } from '../assets/collection.svg';
import { ReactComponent as ShowIcon } from '../assets/show.svg';
import { ReactComponent as GameIcon } from '../assets/game.svg';
import { ReactComponent as PrintIcon } from '../assets/print.svg';
import { ReactComponent as UsersIcon } from '../assets/users.svg';
import { ReactComponent as CalendarIcon } from '../assets/calendar.svg';
import { ShadowCardStyled } from './MainContentStyled';
//import { useTranslation } from 'react-i18next';

const list = [
  {
    id: 0,
    title: 'Використовуйте уроки створені професіоналами',
    icon: <CollectionsIcon />,
    text: (
      <div>
        <p>
          Навіть без авторизації ви можете переглядати уроки які створили
          вчителі недільних школ з інших церков, друкувати матеріали і
          використовувати їх для своїх учнів.
        </p>
        <p>
          Якщо ви авторизуєтеся за допомогою Гугл, платформа дасть вам більше
          можливостей.
        </p>
        <p>
          Перейдіть на вкладку учбових програм та виберіть учбову програму яка
          містит декілька уроків. Знайдіть дропдаун "Додати програму для групи".
          Тепер у вас з'явиться можливість доєднати до уроку вчителів та
          визначити дату проведення
        </p>
      </div>
    ),
    video: 'https://www.youtube.com/embed/cVG0Dtd51VE',
  },
  {
    id: 1,
    title: 'Роздруковуйте підготовані матеріали',
    icon: <PrintIcon />,
    text: (
      <div>
        <p>Більшість реурсів будуть доступні для друку.</p>
        <p>
          Ми намагалися зробити найбільш зручний спосіб друкувати уроки, тести,
          зображення, сценарії свят та анімаціонних шоу та іншого контенту.
        </p>
        <p>
          Використовуйте матеріали платформи у місцях де нема інтернету та для
          того щоб полегшити підготовку для своїх помічників
        </p>
      </div>
    ),
    video: 'https://www.youtube.com/embed/cVG0Dtd51VE',
  },
  {
    id: 2,
    title: 'Створюйте свої власні уроки, навчальні програми та сценарії',
    icon: <CollectionsIcon />,
    text: (
      <div>
        <p>
          Якщо ви талановитий вчитель, креативна особистість створюйте свої
          власні уроки та навчальні програми. Реалізуйте власне бачення для
          своєї церкви!
        </p>
        <p>
          Хочете ділитися продуктом свого таланту з іншими? - ви можете
          публікувати свій власний контент на платформі.
        </p>
        <p>
          Тисніть кнопку "Опублікувати" та після перевірки модератором ваш
          контент буде доступний всім користувачам платформи
        </p>
      </div>
    ),
    video: 'https://www.youtube.com/embed/cVG0Dtd51VE',
  },
  {
    id: 3,
    title: 'Знаходьте цікаві ігри для інтерактивної взаємодії на уроці',
    icon: <GameIcon />,
    text: (
      <div>
        <p>
          У час коли діти проводять дуже багато часу з розумними ґаджетами
          справжні лідери не повинні боротися з прогресом а йти за ними у
          цифровий світ і створювати власні тренди.
        </p>
        <p>
          Ми розробляємо нескладні компьютерні ігри для того щоб додати
          інтерактивності вашим урокам і зацікавити дітей Божим словом у
          цифровому форматі.
        </p>
        <p>
          У планах: робити ігри складнішими та цікавішими, використовувати
          поради і ідеї наших користувачів.
        </p>
      </div>
    ),
    video: 'https://www.youtube.com/embed/cVG0Dtd51VE',
  },
  {
    id: 4,
    title: 'Ведіть облік своїх учнів та відслідковуйте їх успіхи',
    icon: <UsersIcon />,
    text: (
      <div>
        <p>
          Ми автоматизували рутинні процеси менеджменту, щоб у вас була
          можливість фокусуватися на матеріалі. Додавайте дітей у списки,
          розподіляйте їх по групах, доєднуйте вчителів.
        </p>
        <p>
          Оцінюйте прогрес учнів та відслідковуйте зміни. Мотивуйте дітей за
          допомогою візуального відображення результатів
        </p>
        <p>
          На платформі легко збирати списки для звітности, комплектації
          подарунків, розсилки запрошеннь, тощо..
        </p>
      </div>
    ),
    video: 'https://www.youtube.com/embed/cVG0Dtd51VE',
  },
  {
    id: 5,
    title: 'Зберігайте та зручно організовуйте свій власний контент',
    icon: <CollectionsIcon />,
    text: (
      <div>
        <p>
          Служіння дітям вимагає не тільки багато креативності та посвяти але й
          займає багато простору.
        </p>
        <p>
          Першою ідеєю створення цього ресурсу було бажання систематизувати,
          зберігати, повторно використовувати та поширювати для інших безкінечно
          генеруючийся потік творчих зусиль та ідей.
        </p>
        <p>
          Почніть користування, щоб усвідомити що це саме та цифрова шафа зі
          знаряддям для підготовки уроків яку ви так довго шукали
        </p>
      </div>
    ),
    video: 'https://www.youtube.com/embed/cVG0Dtd51VE',
  },
  {
    id: 6,
    title:
      'Знаходьте сценарії за темою, до свят та анімаційно-розважальних подій',
    icon: <ShowIcon />,
    text: (
      <div>
        <p>
          Перш ніж була винайдена та створена ця платформа нескінченна кількість
          добре організованих і ефективних подій було проведено лише один раз в
          одній церкві і зникли на завжди.
        </p>
        <p>
          У світі люди шукають визнаняня авторських прав та не поспішають
          ділитися своїми успішними проектами.
        </p>
        <p>
          Але тут все відкрито і просто. Бери і роби! Вдосконалюй, переробляй і
          масштабуй Царство Боже по всьому обличчу Землі!
        </p>
      </div>
    ),
    video: 'https://www.youtube.com/embed/cVG0Dtd51VE',
  },
  {
    id: 7,
    title:
      'Керуйте графіком зайнятості вчителів та плануйте навчальний процесс',
    icon: <CalendarIcon />,
    text: (
      <div>
        <p>Ще одна корисна фіча: календарне планування.</p>
        <p>
          Додавай події, ділися німи з учасниками, вдосконалюйся у
          таймменеджменті.
        </p>
      </div>
    ),
    video: 'https://www.youtube.com/embed/cVG0Dtd51VE',
  },
  {
    id: 8,
    title:
      'Відслідковуйте практику успішних служінь та масштабуйте здобутий Всесвітньою Церковю досвід',
    icon: <ChurchIcon />,
    text: (
      <div>
        <p>
          На сторінці церков ти побачиш інші церкви, познайомишся з їх баченням
          та знайдеш своїх колег звідусіль.
        </p>
        <p>
          Спілкуйся, ділися, розвивай своє служіння і зростай у християнських
          чеснотах. Найди себе у тілі Хриса та допоможи своїм учням зробити те ж
          саме.
        </p>
      </div>
    ),
    video: 'https://www.youtube.com/embed/cVG0Dtd51VE',
  },
];

export const Home = () => {
  //const { t } = useTranslation('tr');
  const [active, setActive] = useState(0);

  const activeItem = useMemo(() => {
    return list?.find((el) => el.id === active);
  }, [active]);

  return (
    <MainLayout>
      <div className="herro">
        <div className="title-wrapper">
          <h2 className="subtitle"> Kids Spiritual Universe</h2>
          <h1 className="title">Дитячий Духовний Всесвіт</h1>
        </div>
      </div>

      <section className="ksu-content">
        <aside className="aside-wrapper">
          <div>
            <h2 className="title">{activeItem.title}</h2>
            <div>{activeItem.text}</div>
          </div>

          <iframe
            title="appDescription"
            width="100%"
            height="315"
            src={activeItem.video}
            frameBorder="0"
            allowFullScreen={true}
          />
        </aside>
        <section className="content-wrapper">
          <h2 className="title">
            Зробіть своє служіння дітям професійним та системним
          </h2>
          <ul className="benefits">
            {list.map((el) => (
              <ShadowCardStyled
                key={el.id}
                className={active === el.id && 'active'}
                onClick={() => setActive(el.id)}>
                {el.icon}
                <h2 className="subtitle">{el.title}</h2>
              </ShadowCardStyled>
            ))}
          </ul>
        </section>
      </section>
    </MainLayout>
  );
};
