import { createTheme } from "@mui/material";

const material_theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
                disableFocusRipple: true,
                disableTouchRipple: true
            }
        },
    }
})

export default material_theme