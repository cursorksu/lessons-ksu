import { KsuCardStyled } from './KsuCardStyled';
import { Card, Image, CardContent, CardMeta, CardHeader } from 'semantic-ui-react';

export const KsuCard = ({
  title,
  image,
  extra,
  action,
  children,
  className,
  hideAction,
}) => {
  return (
    <Card className={className + 'print-fluid'}>
      <KsuCardStyled>
        {image && <Image src={image} wrapped ui={false} />}
        <CardHeader><h2 className='title'>{title}</h2></CardHeader>
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
