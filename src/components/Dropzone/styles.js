import { Box } from "@mui/material";
import styled from "@emotion/styled";
import {
  BG_GRAY,
  PRIMARY_MAIN,
  BG_SUCCESS,
  DARK_GRAY,
  SUCCESS,
} from "../../constants/colors";

export const FileUploadedStyled = styled("div")`
  margin-top: 12px;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${BG_SUCCESS};
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;
export const StyledDropzoneBody = styled("div")`
  padding-top: 12px;
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 8px;
`;

export const CropperContainerStyled = styled(Box)`
  width: 100%;
  height: 450px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

export const MaskStyled = styled("div")`
  width: 100%;
  height: calc(100vh - 40px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;

  .circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
  }

  .screen {
    width: 100%;
    height: 100vh;
    position: absolute;
  }

  .linear {
    width: 100%;
    height: 2px;
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const BikiniPhotoStyled = styled("div")`
  position: fixed;
  width: 25%;
  height: calc(100vh - 40px);
  top: 0;
`;
export const ActionStyled = styled(Box)`
  font-weight: 600;
  font-size: 20px;
  white-space: nowrap;
  border-radius: 30px;
  background: ${DARK_GRAY};
  margin: 20px auto;
  padding: 8px;
  width: 260px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  position: sticky;
  top: calc(100vh - 120px);
  z-index: 10;

  &.error {
    color: ${PRIMARY_MAIN};
  }

  &.success {
    color: ${SUCCESS};
  }

  & > svg {
    width: 30px;
    height: 30px;
  }

  &.in-table {
    padding: 10px;
    margin: 0;
    display: flex;
    width: auto;
    min-width: initial;
  }
`;

export const UvDropzoneStyled = styled("section")`
  background: ${BG_GRAY};
  border: 1px dashed ${PRIMARY_MAIN};
  border-radius: 4px;
  height: 117px;
  width: 200px;
  display: flex;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 200px;
    height: 150px;
    object-fit: cover;
  }
`;
