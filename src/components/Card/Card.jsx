import { CardStyled } from './CardStyled';
import { Image, CardContent, CardMeta, CardDescription, CardHeader } from 'semantic-ui-react';

export const Card = ({
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
      <CardStyled>
        {image && <Image src={image} wrapped ui={false} />}
      
        <CardContent>
          <CardHeader> {!hideTitle && <h3>}{title}</h3>}</CardHeader>
          <CardMeta>
            <span className='date'>Joined in 2015</span>
          </CardMeta>
          <CardDescription>
          Matthew is a musician living in Nashville.
          </CardDescription>
        </CardContent>
        {children}
        <CardContent extra>
          {extra}
        </CardContent>
        {!hideAction && <div className="card-actions">{action}</div>}
      </CardStyled>
    </Card>
  );
};
