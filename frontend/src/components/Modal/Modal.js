import React, {memo} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {connect} from 'react-redux';
import {closeModal} from "../../store/actions/modal";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function BasicModal(props) {
    const {isOpen, close, text, confirm} = props;

    const confirmModal = () => {
        confirm();
        close();
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h3" sx={{textAlign: 'center'}}>
                        {text}
                    </Typography>
                    <Grid id="modal-modal-description" sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>
                            <Button variant="outlined" color="success" onClick={confirmModal}>
                                Підтвердити
                            </Button>
                        </Typography>
                        <Typography>
                            <Button variant="outlined" color="error" onClick={close}>
                                Скасувати
                            </Button>
                        </Typography>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

const mapStateToProps = ({modal}) => {
    return {
        isOpen: modal.isOpen,
        text: modal.modalText,
        confirm: modal.confirm
    }
};

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(closeModal())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(BasicModal));
