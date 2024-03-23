import React from 'react';
import { MainLayout } from './MainLayout';
//import { useTranslation } from 'react-i18next';

export const Home = () => {
  //const { t } = useTranslation('tr');

  return (
    <MainLayout>
      <div className="herro">
        <div className="title-wrapper">
          <h1 className="title">Kids Spiritual Universe</h1>
          <h2 className="subtitle">Дитячий Духовний Всесвіт</h2>
        </div>
      </div>

      <ul>
        <li>
          <h2 className="subtitle">Використовуйте уроки створені професіоналами</h2>
        </li>
        <li>
          <h2 className="subtitle">Створюйте свої власні уроки та сценарії</h2>
        </li>
        <li>
          <h2 className="subtitle">Знаходьте цікаві ігри для інтерактивної взаємодії на уроці</h2>
        </li>
        <li>
          <h2 className="subtitle">Знаходьте сценарії за темою, до свят та анімаційно-розважальних подій</h2>
        </li>
        <li>
          <h2 className="subtitle">Зберігайте та зручно організовуйте свій власний контент</h2>
        </li>
        <li>
          <h2 className="subtitle">Роздруковуйте підготовані матеріали</h2>
        </li>
        <li>
          <h2 className="subtitle">Ведіть облік своїх учнів та відслідковуйте їх успіхи</h2>
        </li>
        <li>
          <h2 className="subtitle">Керуйте графіком зайнятості вчителів та плануйте навчальний процесс</h2>
        </li>
        <li>
          <h2 className="subtitle">Відслідковуйте практику інших успішних служінь та асштабуйте здобутий Всесвітньою
            Церковю досвід</h2>
        </li>
        <li>
          <h2 className="subtitle">Зробіть своє служіння професійним та системним</h2>
        </li>
      </ul>
    </MainLayout>
  );
};
