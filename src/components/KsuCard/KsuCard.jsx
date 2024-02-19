import { KsuCardStyled } from './KsuCardStyled';
import { Card, Image, CardContent, CardMeta, CardDescription, CardHeader } from 'semantic-ui-react';

export const KsuCard = ({
  title,
  image,
  extra,
  action,
  children,
  className,
  hideTitle,
  hideAction,
}) => {
  return (
    <Card className={className}>
      <KsuCardStyled>
        {image && <Image src={image} wrapped ui={false} />}
        <CardHeader><h3>{title}</h3></CardHeader>
        <CardContent extra>
          {children}
        </CardContent>
        <CardMeta>
          <span className='date'>{extra}</span>
        </CardMeta>
        {!hideAction && <div className="card-actions">{action}</div>}
      </KsuCardStyled>
    </Card>
  );
};
