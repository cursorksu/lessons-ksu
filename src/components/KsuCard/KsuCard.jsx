import { KsuCardStyled } from './KsuCardStyled';
import {
    Card,
    Image,
    CardContent,
    CardMeta,
    CardHeader,
} from 'semantic-ui-react';
import { TitleSmall } from '../TitleStyled';

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
            <KsuCardStyled className={className}>
                {image && <Image src={image} wrapped ui={false}/>}
                <TitleSmall>{title}</TitleSmall>
                <CardContent>{children}</CardContent>
                {extra && (
                        <CardMeta>
                            <span className="date">{extra}</span>
                        </CardMeta>
                )}
                {!hideAction &&  action && <div className="card-actions print-hide">{action}</div>}
            </KsuCardStyled>
    );
};
