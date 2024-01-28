import React from "react";

import {
  Image,
  Center,
  Card,
  CardBody,
  Stack,
  Heading,
  Spinner,
} from "@chakra-ui/react";

function LoadingCard() {
  return (
    <Center>
      <Card maxW="sm" marginTop="10%">
        <CardBody>
          <Image
            src="https://res.cloudinary.com/teepublic/image/private/s--_mTXzfq6--/c_crop,x_10,y_10/c_fit,h_1109/c_crop,g_north_west,h_1260,w_1260,x_-99,y_-76/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-99,y_-76/bo_157px_solid_white/e_overlay,fl_layer_apply,h_1260,l_Misc:Art%20Print%20Bumpmap,w_1260/e_shadow,x_6,y_6/c_limit,h_1254,w_1254/c_lpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1607678631/production/designs/17207804_0.jpg"
            alt="dino no internet"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Stack flexDirection={"row"}>
              <Center>
                <Heading size="md" marginRight={10}>
                  Loading
                </Heading>
                <Spinner />
              </Center>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
}

export default LoadingCard;
