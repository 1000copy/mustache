{{prompt}}dba-profile add profile-id 101 type4 max 10240
{{prompt}}ont-lineprofile gpon profile-id 101
{{prompt}}tcont 1 dba-profile-id 101
{{prompt}}gem add 0 eth tcont 1
{{prompt}}gem mapping 0 1 vlan 100
{{prompt}}commit
{{prompt}}quit
{{prompt}}ont-srvprofile gpon profile-id 101
{{prompt}}ont-port pots adaptive eth adaptive
{{prompt}}commit
{{prompt}}quit
{{#bandwidths}}
{{../prompt}}traffic table ip name  {{value}}M  cir {{value}} cbs 1023 pir 2200 pbs 2000 color-mode color-blind color-policy dei priority 0 priority-policy tag-In-package
{{/bandwidths}}