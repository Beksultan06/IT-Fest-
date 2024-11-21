/******************************************************************************/
/******************************************************************************/

;(function($,doc,win)
{
	"use strict";
	
	var CPBSBookingForm=function(object,option)
	{
		/**********************************************************************/
		
        var $self=this;
		var $this=$(object);
		
		var $optionDefault;
		var $option=$.extend($optionDefault,option);
        
        var $googleMap;
        var $googleMapMarker;
        
        var $startLocation;
		
		var $sidebar;

        /**********************************************************************/
        
        this.setup=function()
        {
            var helper=new CPBSHelper();
            helper.getMessageFromConsole();
            
            $self.e('select,input[type="hidden"]').each(function()
            {
                if($(this)[0].hasAttribute('data-value'))
                    $(this).val($(this).attr('data-value'));
            });
            
            $self.init();
        };
            
        /**********************************************************************/
        
        this.init=function()
        {
            var helper=new CPBSHelper();
            
            if(helper.isMobile())
            {
                $self.e('input[name="cpbs_entry_date"]').attr('readonly','readonly');
                $self.e('input[name="cpbs_exit_date"]').attr('readonly','readonly');
            }
           
            /***/
            
            $(window).resize(function() 
			{
                try
                {
                    $('select').selectmenu('close');
                }
                catch(e) {}
                
                try
                {
                    $('.cpbs-datepicker').datepicker('hide');
                }
                catch(e) {}
                
                try
                {
                    $('.cpbs-timepicker').timepicker('hide');
                }
                catch(e) {}
                
                try
                {
                    $self.e('.ui-timepicker-wrapper').css({opacity:0});
                }
                catch(e) {}
                
                try
                {
                    var currCenter=$googleMap.getCenter();
                    google.maps.event.trigger($googleMap,'resize');
                    $googleMap.setCenter(currCenter);
                }
                catch(e) {}
			});
            
            $self.setWidthClass();
                          
            /***/
            
            $self.e('.cpbs-main-navigation-default a').on('click',function(e)
            {
                e.preventDefault();
                
                var navigation=parseInt($(this).parent('li').data('step'),10);
                var step=parseInt($self.e('input[name="cpbs_step"]').val(),10);
                
                if(navigation-step===0) return;
                
                $self.goToStep(navigation-step);
            });
            
            $self.e('.cpbs-button-step-next').on('click',function(e)
            {
                e.preventDefault();
                $self.goToStep(1);
            });
            
            $self.e('.cpbs-button-step-prev').on('click',function(e)
            {
                e.preventDefault();
                $self.goToStep(-1);
            });
			
			/***/
           
			$self.e('form[name="cpbs-form"]').on('click','.cpbs-quantity a',function(e)
			{
				e.preventDefault();
				
				var step=1;
				
				var parent=$(this).parent('.cpbs-quantity');
				var text=parent.children('input[type="text"]');
				
				if($(this).hasClass('cpbs-quantity-minus')) step=-1;
				
				var value=parseInt(text.val())+step;
				
				if((value>=parent.attr('data-min')) && (value<=parent.attr('data-max'))) text.val(value);
			});
			
			$self.e('form[name="cpbs-form"]').on('change','.cpbs-quantity input[type="text"]',function(e)
			{
				e.preventDefault();
				
				var parent=$(this).parent('.cpbs-quantity');
				
				var value=parseInt($(this).val(),10);
				
				if(!((value>=parent.attr('data-min')) && (value<=parent.attr('data-max')))) $(this).val(parent.attr('data-default'));
			});
			
            /***/
            
            $self.e('form[name="cpbs-form"]').on('click','.cpbs-form-field',function(e)
            {
                e.preventDefault();
                $(this).find(':input').focus(); 
                
                var select=$(this).find('select');
                
                if(select.length)
                    select.selectmenu('open');
            });
            
            $self.e('.cpbs-button-checkbox>a').on('click',function(e)
            {
                e.preventDefault();
                
                if($(this).hasClass('cpbs-state-selected')) return;
                
                var section=$(this).parent(':first');
                
                section.children('a').removeClass('cpbs-state-selected');
                
                $(this).addClass('cpbs-state-selected');
            });
            
			/***/
			 
			$self.e('.cpbs-main-content-step-1').on('click','.cpbs-form-panel .cpbs-button',function(e)
			{
				e.preventDefault();
				
				if(parseInt($option.widget.mode,10)===1)
				{
					var data={};

					/***/

					data.entry_date=$self.e('[name="cpbs_entry_date"]').val();
					data.entry_time=$self.e('[name="cpbs_entry_time"]').val();
					data.exit_date=$self.e('[name="cpbs_exit_date"]').val();
					data.exit_time=$self.e('[name="cpbs_exit_time"]').val();  
					
					/***/

					data.location_id=$self.e('[name="cpbs_location_id"]').val();

					/***/

					data.widget_submit=1;
					
					/***/

					var url=$option.widget.booking_form_url;

					if(url.indexOf('?')===-1) url+='?';
					else url+='&';

					url+=decodeURIComponent($.param(data));

					window.location=url;
				}
				else
				{
					$self.goToStep(1);
				}
			});
			
            /***/
            
            $self.e('.cpbs-main-content-step-2').on('click','.cpbs-booking-extra-list .cpbs-button.cpbs-button-style-1',function(e)
            {
                e.preventDefault();
				
				if($(this).hasClass('cpbs-state-selected-mandatory')) return;
				
                $(this).toggleClass('cpbs-state-selected'); 
                $(this).parents('li:first').find('.cpbs-quantity').toggleClass('cpbs-state-disabled');
				
				$self.setBookingExtraIdField();
                $self.createSummaryPriceElement();
            });
            
            $self.e('.cpbs-main-content-step-2').on('blur','.cpbs-booking-extra-list input[type="text"]',function()
            {
                $self.createSummaryPriceElement();
            });
			
            $self.e('.cpbs-main-content-step-2').on('focus','.cpbs-booking-extra-list input[type="text"]',function()
            {
                $(this).select();
            });
			
			$self.e('form[name="cpbs-form"]').on('click','.cpbs-quantity a',function(e)
			{
				$self.createSummaryPriceElement();
			});
            
            /***/
            
            $self.e('.cpbs-main-content-step-2').on('click','.cpbs-place-list .cpbs-button.cpbs-button-style-1',function(e)
            {
                e.preventDefault();
				
				if($(this).hasClass('cpbs-state-disabled')) return;
                if($(this).hasClass('cpbs-state-selected')) return;
                
                $self.e('.cpbs-place-list .cpbs-button.cpbs-button-style-1').removeClass('cpbs-state-selected');
                
                $(this).addClass('cpbs-state-selected');
                
                $self.e('input[name="cpbs_place_type_id"]').val(parseInt($(this).parents('.cpbs-place').attr('data-place_type_id'),10));
                
                $self.getGlobalNotice().addClass('cpbs-hidden');
                
                if(parseInt($option.scroll_to_booking_extra_after_select_place_enable)===1)
                {
					$self.createSummaryPriceElement();
					
                    var bookingExtra=$self.e('.cpbs-booking-extra');
                    if(bookingExtra.children('.cpbs-booking-extra-list').length===1) $.scrollTo(bookingExtra,200,{offset:-50});
                }
				else if(parseInt($option.redirect_to_next_step_after_select_place_enable)===1)
                {
					$self.createSummaryPriceElement(function() 
					{
						$self.goToStep(1);
					});			
				}
				
				$self.nextButtonEnable();
                $self.changeBookingExtraPrice();
            });
            
            /***/
            
            $self.e('.cpbs-main-content-step-3').on('change','input[name="cpbs_client_sign_up_enable"]',function(e)
            { 
                var value=parseInt($(this).val())===1 ? 1 : 0;
                var section=$(this).parents('.cpbs-form-panel:first').find('.cpbs-form-panel-content>.cpbs-disable-section');
                
                if(value===0) section.removeClass('cpbs-hidden');
                else section.addClass('cpbs-hidden');
                
                $(window).scroll();
            });
            
            $self.e('.cpbs-main-content-step-3').on('change','input[name="cpbs_client_billing_detail_enable"]',function(e)
            { 
                var value=parseInt($(this).val())===1 ? 1 : 0;
                var section=$(this).parents('.cpbs-form-panel:first').find('.cpbs-form-panel-content>.cpbs-disable-section');
				
                if(value===0) section.removeClass('cpbs-hidden');
                else section.addClass('cpbs-hidden');
                
                $(window).scroll();
            });
            
            $self.e('.cpbs-main-content-step-3').on('click','.cpbs-sign-up-password-generate',function(e)
            {
                e.preventDefault();
                
                var helper=new CPBSHelper();
                var password=helper.generatePassword(8);
                
                $self.e('input[name="cpbs_client_sign_up_password"],input[name="cpbs_client_sign_up_password_retype"]').val(password);
            });
            
            $self.e('.cpbs-main-content-step-3').on('click','.cpbs-sign-up-password-show',function(e)
            {
                e.preventDefault();
                
                var password=$self.e('input[name="cpbs_client_sign_up_password"]');
                password.attr('type',(password.attr('type')==='password' ? 'text' : 'password'));
            });
            
            $self.e('.cpbs-main-content-step-3').on('click','.cpbs-button-sign-up',function(e)
            {
                e.preventDefault();
                
                $self.e('.cpbs-client-form-sign-up').removeClass('cpbs-hidden');
                $self.e('input[name="cpbs_client_account"]').val(1);
            });
            
            $self.e('.cpbs-main-content-step-3').on('click','.cpbs-button-sign-in',function(e)
            {
                e.preventDefault();
                
                $self.getGlobalNotice().addClass('cpbs-hidden');
                
                $self.preloader(true);
            
                $self.setAction('user_sign_in');
       
                $self.post($self.e('form[name="cpbs-form"]').serialize(),function(response)
                {
                    if(parseInt(response.user_sign_in,10)===1)
                    {
                        $self.e('.cpbs-main-content-step-3 .cpbs-client-form').html('');
                 
                        if(typeof(response.client_form_sign_up)!=='undefined')
                            $self.e('.cpbs-main-content-step-3 .cpbs-client-form').append(response.client_form_sign_up);  
       
                        if(typeof(response.summary)!=='undefined')
                            $self.e('.cpbs-main-content-step-3>.cpbs-layout-25x75 .cpbs-layout-column-left:first').html(response.summary[0]);                        
                        
                        $self.createSelectField();
                    }
                    else
                    {
                        if(typeof(response.error.global[0])!=='undefined')
                            $self.getGlobalNotice().removeClass('cpbs-hidden').html(response.error.global[0].message);
                    }
                    
                    $self.preloader(false);
                });
            });
    
            $self.e('>*').on('click','.cpbs-form-checkbox',function()
            {
                var text=$(this).nextAll('input[type="hidden"]');
				var value=$(this).attr('data-value');
				
				if($(this).hasClass('cpbs-state-selected-mandatory'))
				{
					
				}
				else
				{
					if(text.val()!='0') value=0;
				}
				
				if($(this).attr('data-group'))
				{
					var element=$self.e('.cpbs-form-checkbox[data-group="'+$(this).attr('data-group')+'"]');
					
					element.each(function() 
					{
						$(this).removeClass('cpbs-state-selected');
						
						var text=$(this).nextAll('input[type="hidden"]');
						
						text.val(0);
						
						$self.e('[name="'+text.attr('data-rel-field')+'"]').val(0);
					});
				}
				
                if(value=='0') $(this).removeClass('cpbs-state-selected');
				else $(this).addClass('cpbs-state-selected');
				
				if(text.attr('data-rel-field'))
					$self.e('[name="'+text.attr('data-rel-field')+'"]').val(value);
                
                text.val(value).trigger('change');
            });
            
            /***/            
            
            $self.e('.cpbs-main-content-step-4').on('click','.cpbs-coupon-code-section a',function(e)
            {
                e.preventDefault();
                
                $self.setAction('coupon_code_check');
       
                $self.post($self.e('form[name="cpbs-form"]').serialize(),function(response)
                {
                    $self.e('.cpbs-summary-price-element').replaceWith(response.html);
                    
                    var object=$self.e('.cpbs-coupon-code-section');
                    
                    object.qtip(
                    {
                        show:
						{ 
                            target:$(this) 
                        },
                        style:
						{ 
                            classes:(response.error===1 ? 'cpbs-qtip cpbs-qtip-error' : 'cpbs-qtip cpbs-qtip-success')
                        },
                        content:
						{ 
                            text:response.message 
                        },
                        position:
						{ 
                            my:($option.is_rtl ? 'bottom right' : 'bottom left'),
                            at:($option.is_rtl ? 'top right' : 'top left'),
                            container:object.parent()
                        }
                    }).qtip('show');	
                    
                });
            });
            
            /***/
			
            $('.cpbs-datepicker').datepicker(
            {
                autoSize:true,
                dateFormat:$option.date_format_js,
                beforeShow:function(date,instance)
                {
					var helper=new CPBSHelper();
					var value=helper.getValueFromClass($(instance.dpDiv),'cpbs-booking-form-id-');
					
					if(value!==false) $(instance.dpDiv).removeClass('cpbs-booking-form-id-'+value);
					
					$(instance.dpDiv).addClass('cpbs-main cpbs-booking-form-id-'+$option.booking_form_id);
					
                    var locationId=$self.getLocationId();
             
					$(this).datepicker('option','minDate',$option.location_entry_period_format[locationId].min); 

					if($(date).attr('name')==='cpbs_entry_date')
					{
						$(this).datepicker('option','maxDate',$option.location_entry_period_format[locationId].max);
					}
					
					if($(date).attr('name')==='cpbs_exit_date')
					{
						try
						{
							var dateEntry=$self.e('[name="cpbs_entry_date"]').val();
							var dateParse=$.datepicker.parseDate($option.date_format_js,dateEntry);
							
							if(dateParse!==null)
							{
								$(this).datepicker('option','minDate',dateEntry); 
							}
						}
						catch(e)
						{
							
						}
					}
                
                    $(this).datepicker('refresh');
                },
                beforeShowDay:function(date)
                {
                    var helper=new CPBSHelper();
                    
                    var locationId=$self.getLocationId();
					
                    var date=$.datepicker.formatDate('dd-mm-yy',date);
                    
                    for(var i in $option.location_date_exclude[locationId])
                    {
                        var r=helper.compareDate([date,$option.location_date_exclude[locationId][i].start,$option.location_date_exclude[locationId][i].stop]);
                        if(r) return([false,'','']);
                    }
                    
                    /***/
                    
                    var temp=date.split('-');
                    var date=new Date(temp[2],temp[1]-1,temp[0]);
                    
					/***/
					
					var dateSelected=$self.getDateSelected(date);
					var businessHourIndex=$self.getBusinessHourIndex($option.location_business_hour[locationId]['available'],date,dateSelected);
              
					if((!$option.location_business_hour[locationId]['available'][businessHourIndex]) || (!$option.location_business_hour[locationId]['available'][businessHourIndex])) 
					return([false,'','']);
                    
                    /***/
                    
                    return([true,'','']);
                },
                onSelect:function(date,object)
                {
                    var dateField=$(this);
                                        
                    var timeField=dateField.parent('div').parent('div').find('.cpbs-timepicker');

                    var locationId=$self.getLocationId();

                    timeField.timepicker(
                    { 
                        appendTo:$this,
                        showOn:[],
                        showOnFocus:false,
                        timeFormat:$option.time_format,
                        step:$option.timepicker_step,
                        disableTouchKeyboard:true
                    });
					
					/***/
					
					var dateSelected=$self.getDateSelected(null,object);
					var businessHourIndex=$self.getBusinessHourIndex($option.location_business_hour[locationId]['available'],dateField.datepicker('getDate'),dateSelected);
				   
					/***/
					
					var minTime='00:00';
					var maxTime='23:59';
					
                    if(typeof($option.location_business_hour[locationId]['available'][businessHourIndex])!=='undefined')
                    {
						var length=$option.location_business_hour[locationId]['available'][businessHourIndex].length;
						
                        minTime=$option.location_business_hour[locationId]['available'][businessHourIndex][0].start;
                        maxTime=$option.location_business_hour[locationId]['available'][businessHourIndex][length-1].stop;                        
                    }

					/***/
					
					if(dateField.attr('name')==='cpbs_entry_date')
					{
						var t=$option.location_entry_period[locationId].min.split(' ');
						
						if((dateSelected===t[0]) && (dateSelected==$option.current_date))
						{
							if(Date.parse('01/01/1970 '+t[1])>Date.parse('01/01/1970 '+minTime))
								minTime=t[1];
						}

						if(!helper.isEmpty($option.location_entry_period[locationId].max))
						{
							var t=$option.location_entry_period[locationId].max.split(' ');

							if(dateSelected===t[0])
							{
								if(Date.parse('01/01/1970 '+t[1])<Date.parse('01/01/1970 '+maxTime))
									maxTime=t[1];
							}					
						}
					}
					
					/***/
					
                    timeField.timepicker('option','minTime',minTime);
                    timeField.timepicker('option','maxTime',maxTime);  
					
					/***/
					
					if(!helper.isEmpty($option.location_business_hour[locationId]['unavailable'][businessHourIndex]))
					{
						var unavailable=[[],[]];
						
						unavailable[0]=$option.location_business_hour[locationId]['unavailable'][businessHourIndex];

						for(var i in unavailable[0])
							unavailable[1].push([unavailable[0][i].start,unavailable[0][i].stop]);
		
						timeField.timepicker('option','disableTimeRanges',unavailable[1]);
					}
					
					/***/
					
                    timeField.val('').timepicker('show');
                    timeField.blur();

                    $self.setTimepicker(timeField);
                }
            });
            
            $this.on('focusin','.cpbs-timepicker',function()
			{
                var helper=new CPBSHelper();
                
                var dateField=$(this).parent('div').parent('div').find('.cpbs-datepicker');
                
                if(helper.isEmpty(dateField.val()))
                {
                    $(this).timepicker('remove');
                    dateField.click();
                    return;
                }
                else
                {
                    if(helper.isEmpty($(this).val()))
                        $(this).timepicker('show');
                }
            });
            
            /***/
            
            $self.createSelectField();
              
            /***/
    
            $self.e('.cpbs-form-field').has('select').css({cursor:'pointer'});
            
			/***/
			
			$self.e('.cpbs-location-info-frame').on('click',function(e)
			{
				if($.inArray('cpbs-location-info-frame',e.originalEvent.srcElement.classList)>=0)
				{
					e.preventDefault();
					$self.closeLocationFrame();
				}
			});
			
            /***/
            
            $(document).keypress(function(e) 
            {
                if(parseInt(e.which,10)===13) 
                {
                    switch($(e.target).attr('name'))
                    {
                        case 'cpbs_client_sign_in_login':
                        case 'cpbs_client_sign_in_password':
                        
                            $self.e('.cpbs-main-content-step-3 .cpbs-button-sign-in').trigger('click');
                        
                        break;
                    }
                }
            });
            
            /***/
			
            if(parseInt(helper.urlParam('widget_submit'))===1)    
            {
                $self.goToStep(1,function()
                {
                    $self.googleMapCreate();
                    $self.googleMapInit();
                    $this.removeClass('cpbs-hidden');
                });
            }
            else 
            {
                $self.googleMapCreate();
                $self.googleMapInit();
                $this.removeClass('cpbs-hidden'); 
            }
			
			/***/
        };
		
		/**********************************************************************/
		
		this.nextButtonEnable=function()
		{
			var step=parseInt($self.e('input[name="cpbs_step"]').val(),10)
			if(step===2)
			{
				if(parseInt($option.second_step_next_button_enable,10)===1)
				{
					var nextButton=$self.e('.cpbs-main-content-navigation-button .cpbs-button-step-next');
					var count=parseInt($self.e('.cpbs-place .cpbs-place-select-button.cpbs-state-selected').length,10);
					
					if(count===1) nextButton.removeClass('cpbs-hidden');
					else nextButton.addClass('cpbs-hidden');
				}
			}
		};
		
		/**********************************************************************/
		
		this.getBusinessHourIndex=function(businessHour,date,dateSelected)
		{
			var businessHourIndex;
			
			/***/
			
			var dayWeek=parseInt(date.getDay(),10);
			if(dayWeek===0) dayWeek=7;
					
			/***/
					
			if(typeof(businessHour[dateSelected])!=='undefined')
				businessHourIndex=dateSelected;
			else if(typeof(businessHour[dayWeek])!=='undefined')
				businessHourIndex=dayWeek;			
			
			return(businessHourIndex)
		};
		
		/**********************************************************************/
		
		this.getDateSelected=function(date=null,object=null)
		{
			var dateSelected=[];
			
			if(object!==null)
				dateSelected=[object.selectedDay,object.selectedMonth+1,object.selectedYear];
            else if(date!==null)  
				dateSelected=[date.getDate(),date.getMonth()+1,date.getYear()];
			
			/***/
			
			for(var i in dateSelected)
            {
				if(new String(dateSelected[i]).length===1) dateSelected[i]='0'+dateSelected[i];
            }
                    
			dateSelected=dateSelected[0]+'-'+dateSelected[1]+'-'+dateSelected[2];	
			
			return(dateSelected);
		};
		
		/**********************************************************************/
		
		this.setPayment=function()
		{
			var paymentId=0;
			var paymentSelected=$self.e('.cpbs-payment>li>span.cpbs-state-selected');
			
			if(paymentSelected.length===1)
				paymentId=paymentSelected.attr('data-value');
			
			$self.e('input[name="cpbs_payment_id"]').val(paymentId);
		};
        
        /**********************************************************************/
        
        this.changeBookingExtraPrice=function()
        {  

        };
 
        /**********************************************************************/
        
        this.createSelectField=function()
        {
            $self.e('select').selectmenu(
            {
                appendTo:$this,
                open:function(event,ui)
                {
                    var select=$(this);
                    var selectmenu=$('#'+select.attr('id')+'-menu').parent('div');
                    
                    var field=select.parents('.cpbs-form-field:first');
                    
                    var left=parseInt(selectmenu.css('left'),10)-1;
                    
                    var width=field[0].getBoundingClientRect().width;
                    
                    selectmenu.css({width:width,left:left});
                },
                change:function(event,ui)
                {
                    var name=$(this).attr('name');
                    if(name==='cpbs_navigation_responsive')
                    {
                        var navigation=parseInt($(this).val(),10);
                        
                        var step=parseInt($self.e('input[name="cpbs_step"]').val(),10);    
                
                        if(navigation-step===0) return;

                        $self.goToStep(navigation-step);
                    }
					else if(name==='cpbs_location_id')
					{	
						if($.inArray('2',$option.location_detail_window_open_action)>-1)
						{
							$self.openLocationFrame($self.getLocationId());							
						}
					}
                },
				select:function(event,ui)
				{
					var name=$(this).attr('name');	
					if(name==='cpbs_location_id')
					{	
						if($.inArray('2',$option.location_detail_window_open_action)>-1)
						{
							$self.openLocationFrame($self.getLocationId());							
						}
					}
				}
            });
                        
            $self.e('.ui-selectmenu-button .ui-icon.ui-icon-triangle-1-s').attr('class','cpbs-meta-icon-arrow-vertical');  
        };
        
		/**********************************************************************/
		
		this.setBookingExtraIdField=function()
		{
			var data=[];
			$self.e('.cpbs-booking-extra-list .cpbs-button.cpbs-button-style-1').each(function()
            {
				if($(this).hasClass('cpbs-state-selected'))
					data.push($(this).parents('li:first').attr('data-id'));
			});
                
            $self.e('input[name="cpbs_booking_extra_id"]').val(data.join(','));
		};
        
        /**********************************************************************/
        
        this.setTimepicker=function(field)
        {
            $self.e('.ui-timepicker-wrapper').css({opacity:1,'width':field.parent('div').outerWidth()+1});
        };
        
        /**********************************************************************/
        
        this.getLocationId=function()
        {
			var locationField=$self.e('[name="cpbs_location_id"]');
			
			if(parseInt(locationField.length,10)===1)
				return(parseInt(locationField.val(),10));
			
			return($option.location_id);
        };
        
        /**********************************************************************/
        /**********************************************************************/
        
        this.setMainNavigation=function()
        {
            var step=parseInt($self.e('input[name="cpbs_step"]').val(),10);
     
            var element=$self.e('.cpbs-main-navigation-default').find('li');
            
            element.removeClass('cpbs-state-selected').removeClass('cpbs-state-completed');
            
            element.filter('[data-step="'+step+'"]').addClass('cpbs-state-selected');

            var i=0;
            element.each(function()
            {
                if((++i)>=step) return;
                
                $(this).addClass('cpbs-state-completed');
            });
        };
                
        /**********************************************************************/
        /**********************************************************************/

        this.setAction=function(name)
        {
            $self.e('input[name="action"]').val('cpbs_'+name);
        };

        /**********************************************************************/
        
        this.e=function(selector)
        {
            return($this.find(selector));
        };

        /**********************************************************************/
        
        this.goToStep=function(stepDelta,callback)
        {               
            $self.preloader(true);
            
            $self.setAction('go_to_step');
            
            var step=$self.e('input[name="cpbs_step"]');
            var stepRequest=$self.e('input[name="cpbs_step_request"]');
            stepRequest.val(parseInt(step.val(),10)+stepDelta);
            
            $self.post($self.e('form[name="cpbs-form"]').serialize(),function(response)
            {
                response.step=parseInt(response.step,10);
             
                if(parseInt(response.step,10)===5)
                {
					if(parseInt(response.payment_id,10)===-1)
					{
						if(parseInt(response.thank_you_page_enable,10)!==1)
						{
							window.location.href=response.payment_url;
							return;
						}						
					}
				}
	
                $self.getGlobalNotice().addClass('cpbs-hidden');
                
                $self.e('.cpbs-main-content>div').css('display','none');
                $self.e('.cpbs-main-content>div:eq('+(response.step-1)+')').css('display','block');
                
                $self.e('input[name="cpbs_step"]').val(response.step);
                
                $self.setMainNavigation();
                
                $self.googleMapDuplicate(-1);
                
                if($self.googleMapExist())
                    google.maps.event.trigger($googleMap,'resize');
                
                $('select[name="cpbs_navigation_responsive"]').val(response.step);
                $('select[name="cpbs_navigation_responsive"]').selectmenu('refresh');
				  
                switch(parseInt(response.step,10))
                {
                    case 2:
                        
                        if(typeof(response.place)!=='undefined')
                            $self.e('.cpbs-place-list').html(response.place);
                        
                        if(typeof(response.booking_extra)!=='undefined')
                            $self.e('.cpbs-booking-extra').html(response.booking_extra);                        
                        
                        if(typeof(response.summary)!=='undefined')
                            $self.e('.cpbs-main-content-step-2>.cpbs-layout-25x75 .cpbs-layout-column-left:first').html(response.summary[0]);  
                        
                        $self.preloadPlaceImage();
						
						$self.setBookingExtraIdField();
						$self.createSummaryPriceElement();
						$self.nextButtonEnable();
                        
                    case 3:
                        
                        if((typeof(response.client_form_sign_id)!=='undefined') && (typeof(response.client_form_sign_up)!=='undefined'))
                        {
                            $self.e('.cpbs-main-content-step-3 .cpbs-client-form').html('');

                            if(typeof(response.client_form_sign_id)!=='undefined')
                                $self.e('.cpbs-main-content-step-3 .cpbs-client-form').prepend(response.client_form_sign_id);                        

                            if(typeof(response.client_form_sign_up)!=='undefined')
                                $self.e('.cpbs-main-content-step-3 .cpbs-client-form').append(response.client_form_sign_up); 
                        }
                        
                        if(typeof(response.summary)!=='undefined')
                            $self.e('.cpbs-main-content-step-3>.cpbs-layout-25x75 .cpbs-layout-column-left:first').html(response.summary[0]);
                        
                        if(typeof(response.payment)!=='undefined')
                            $self.e('.cpbs-main-content-step-3>.cpbs-layout-25x75 .cpbs-layout-column-right #cpbs-payment').html(response.payment);
						
						$self.createLocationFrameLink();
                        $self.createSelectField();
						$self.setPayment();
						
                    break;
                    
                    case	  4:
                        
                        if(typeof(response.summary)!=='undefined')
                        {
                            $self.e('.cpbs-main-content-step-4>.cpbs-layout-50x50>.cpbs-layout-column-left').html(response.summary[0]);
                            $self.e('.cpbs-main-content-step-4>.cpbs-layout-50x50>.cpbs-layout-column-right').html(response.summary[1]);
                        }
                        
                    break;
                }
				                
                $('.qtip').remove();
                
                if($.inArray(response.step,[4])>-1)   
                    $self.googleMapDuplicate(response.step);
                
                if(typeof(response.error)!=='undefined')
                {
                    if(typeof(response.error.local)!=='undefined')
                    {
                        for(var index in response.error.local)
                        {
                            var selector,object;
                            
                            var sName=response.error.local[index].field.split('-');

                            if(isNaN(sName[1])) selector='[name="'+sName[0]+'"]:eq(0)';
                            else selector='[name="'+sName[0]+'[]"]:eq('+sName[1]+')';                                    
                                    
                            object=$self.e(selector).prevAll('label');
                                 
                            object.qtip(
                            {
                                show:
								{ 
                                    target:$(this) 
                                },
                                style:
								{ 
                                    classes:(response.error===1 ? 'cpbs-qtip cpbs-qtip-error' : 'cpbs-qtip cpbs-qtip-success')
                                },
                                content:
								{ 
                                    text:response.error.local[index].message 
                                },
                                position:
								{ 
									my:($option.is_rtl ? 'bottom right' : 'bottom left'),
									at:($option.is_rtl ? 'top right' : 'top left'),
                                    container:object.parent()
                                }
                            }).qtip('show');	
                        }
                    }
                    
                    if(typeof(response.error.global[0])!=='undefined')
                        $self.getGlobalNotice().removeClass('cpbs-hidden').html(response.error.global[0].message);
                }
                
                if(parseInt(response.step,10)===5)
                {
                    $self.e('.cpbs-main-navigation-default').addClass('cpbs-hidden');
                    $self.e('.cpbs-main-navigation-responsive').addClass('cpbs-hidden');
                    
					if(typeof(response.error)!=='undefined')
					{
						$self.getGlobalNotice().removeClass('cpbs-hidden').html(response.error.global[0].message);	
					}
					else
					{
						if($.inArray(parseInt(response.payment_id,10),[1,2,3,4])>-1)
						{
							var helper=new CPBSHelper();

							if(!helper.isEmpty(response.payment_info))
								$self.e('.cpbs-booking-complete-payment-'+response.payment_prefix).append('<p>'+response.payment_info+'</p>');
						}

						switch(parseInt(response.payment_id,10))
						{
							case -2:

								$self.e('.cpbs-booking-complete-payment-none').css('display','block');
								$self.e('.cpbs-booking-complete-payment-none>a').attr('href',response.button_back_to_home_url_address).text(response.button_back_to_home_label);

							break;

							case -1:

								if(parseInt(response.thank_you_page_enable,10)!==1)
								{
									window.location.href=response.payment_url;
								}
								else
								{
									$self.e('.cpbs-booking-complete-payment-woocommerce').css('display','block');
									$self.e('.cpbs-booking-complete-payment-woocommerce>a').attr('href',response.payment_url);
								}

							break;

							case 1:

								$self.e('.cpbs-booking-complete-payment-cash').css('display','block');
								$self.e('.cpbs-booking-complete-payment-cash>a').attr('href',response.button_back_to_home_url_address).text(response.button_back_to_home_label);

							break;

							case 2:

								$('body').css('display','none');

								$.getScript('https://js.stripe.com/v3/',function() 
								{								
									var stripe=Stripe(response.stripe_publishable_key);
									var section=$self.e('.cpbs-booking-complete-payment-stripe');

									$self.e('.cpbs-booking-complete').on('click','.cpbs-booking-complete-payment-stripe a',function(e)
									{
										e.preventDefault();

										stripe.redirectToCheckout(
										{
											sessionId:response.stripe_session_id
										}).then(function(result) 
										{

										});
									});

									var counter=parseInt(response.stripe_redirect_duration,10);

									if(counter<=0)
									{
										section.find('a').trigger('click');
									}
									else
									{
										$('body').css('display','block');

										section.css('display','block');

										var interval=setInterval(function()
										{
											counter--;
											section.find('a>span').html(counter);

											if(counter===0)
											{
												clearInterval(interval);
												section.find('a').trigger('click');
											}

										},1000);  
									}
								});

							break;

							case 3:

								$('body').css('display','none');

								var section=$self.e('.cpbs-booking-complete-payment-paypal');

								$self.e('.cpbs-booking-complete').on('click','.cpbs-booking-complete-payment-paypal a',function(e)
								{
									e.preventDefault();

									var form=$self.e('form[name="cpbs-form-paypal"][data-location-id="'+locationId+'"]');

									for(var i in response.form)
										form.find('input[name="'+i+'"]').val(response.form[i]);

									form.submit();
								});

								var locationId=$self.getLocationId();

								var counter=$option.location_payment_paypal_redirect_duration[locationId];

								section.find('a>span').html(counter);

								if(counter<=0)
								{
									section.find('a').trigger('click');
								}
								else
								{
									$('body').css('display','block');

									section.css('display','block');

									var interval=setInterval(function()
									{
										counter--;
										section.find('a>span').html(counter);

										if(counter===0)
										{
											clearInterval(interval);
											section.find('a').trigger('click');
										}

									},1000);  
								}

							break;

							case 4:

								$self.e('.cpbs-booking-complete-payment-wire_transfer').css('display','block');
								$self.e('.cpbs-booking-complete-payment-wire_transfer>a').attr('href',response.button_back_to_home_url_address).text(response.button_back_to_home_label);

							break;
						}
					}
                }
                                
				$self.preloader(false);
				
                if(typeof(callback)!=='undefined') callback();

				$self.createStickySidebar();
				$(window).scroll();
				
                var offset=20;
                
                if($('#wpadminbar').length===1)
                    offset+=$('#wpadminbar').height();
                
                $.scrollTo($('.cpbs-main'),{offset:-1*offset});
            });
        };
		
        /**********************************************************************/
        
		this.post=function(data,callback)
		{
			$.post($option.ajax_url,data,function(response)
			{ 
				callback(response); 
			},'json');
		};    
        
        /**********************************************************************/
        
        this.preloader=function(action)
        {
            $('#cpbs-preloader').css('display',(action ? 'block' : 'none'));
        };
        
        /**********************************************************************/
        
        this.preloadPlaceImage=function()
        {
			try
			{
				$self.e('.cpbs-place-list .cpbs-place-image img').one('load',function()
				{
					$(this).parent('.cpbs-place-image').animate({'opacity':1},300);
				}).each(function() 
				{
					if(this.complete) $(this).load();
				});
			}
			catch(e) {}
        };
        
        /**********************************************************************/
        /**********************************************************************/
       	   
        this.googleMapExist=function()
        {
            return(typeof($googleMap)==='undefined' ? false : true);
        };
        
        /**********************************************************************/
       
        this.googleMapDuplicate=function(step)
        {
            if(!$self.googleMapExist()) return;
            
            if(step===4)
            {
                var map=$self.e('.cpbs-google-map>#cpbs_google_map');
                if(map.children('div').length)
                {
					map.css('height','');
					
					$self.googleMapCreateMarker(parseInt($self.e('[name="cpbs_location_id"]').val()));
					
                    $self.e('.cpbs-google-map-summary').append(map);   
                }
            }
            else
            {
                var map=$self.e('.cpbs-google-map-summary>#cpbs_google_map');
                if(map.children('div').length)
                {
                    $self.e('.cpbs-google-map').append(map);
                    $self.googleMapCreateMarker(-1);
                }
            }
            
            google.maps.event.trigger($googleMap,'resize');
        };
        
        /**********************************************************************/
        
        this.googleMapCreateMarker=function(locationIdSelected)
        {
            if(!$self.googleMapExist()) return;
            
            for(var i in $googleMapMarker)
                $googleMapMarker[i].setMap(null);
            
            $googleMapMarker=[];
            
            if(Object.keys($option.location_coordinate).length)
            {
                var bound=new google.maps.LatLngBounds();
				
                for(var i in $option.location_coordinate)
                {
                    if(locationIdSelected!==-1)
                    {
                        if(locationIdSelected!==parseInt(i,10)) continue;
                    }
                    
                    var coordinate=new google.maps.LatLng($option.location_coordinate[i].lat,$option.location_coordinate[i].lng);
                    
                    var marker=new google.maps.Marker(
                    {
                        id:i,
                        map:$googleMap,
                        position:coordinate,
                        icon:
						{
                            path:'M21,0A21,21,0,0,1,42,21c0,16-21,29-21,29S0,37,0,21A21,21,0,0,1,21,0Z',
                            fillColor:'#'+$option.booking_form_color[1],
                            strokeColor:'#'+$option.booking_form_color[1],
                            fillOpacity:1,
                            labelOrigin:new google.maps.Point(21,21),
                            anchor:new google.maps.Point(21,50)
                        },
                        label:
						{
                            text:' ', 
                            color:'#'+$option.booking_form_color[3],
                            fontSize:'14px',
                            fontWeight:'400',
                            fontFamily:'Lato'
                        }
                    });
                    
                    if(locationIdSelected===-1)
                    {
						if($.inArray('1',$option.location_detail_window_open_action)>-1)
						{
							marker.addListener('click',function() 
							{
								$self.openLocationFrame($(this)[0].id);
							});
						}
                    }    
                
                    if(locationIdSelected===-1)
                        bound.extend(coordinate);
                    
                    $googleMapMarker.push(marker);
                }
                
                if((locationIdSelected===-1) && ($googleMapMarker.length>1))
                    $googleMap.fitBounds(bound,{top:400,right:50,bottom:50,left:50});
                else $googleMap.setCenter(coordinate);
            }            
        };
        
        /**********************************************************************/
        
        this.googleMapInit=function()
        {
            if(!$self.googleMapExist()) return;
            
            if(Object.keys($option.location_coordinate).length)
            {
                $self.googleMapCreateMarker(-1);
            }
            else
            {
                if((navigator.geolocation) && ($.inArray(1,$option.geolocation_enable))) 
                {
                    navigator.geolocation.getCurrentPosition(function(position)
                    {
                        $startLocation=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                        $googleMap.setCenter($startLocation);
                    },
                    function()
                    {
                        $self.googleMapUseDefaultLocation();
                    });
                } 
                else
                {
                    $self.googleMapUseDefaultLocation();
                }
            }
        };
        
        /**********************************************************************/
        
        this.googleMapUseDefaultLocation=function()
        {
            if(!$self.googleMapExist()) return;
            
            $startLocation=new google.maps.LatLng($option.client_coordinate.lat,$option.client_coordinate.lng);
            $googleMap.setCenter($startLocation);            
        };
        
        /**********************************************************************/
        
        this.googleMapCreate=function()
        {
            if($self.e('#cpbs_google_map').length!==1) return;
            
            var option= 
            {
                draggable:false,
                scrollwheel:$option.gooogleMapOption.scrollwheel.enable,
                mapTypeId:google.maps.MapTypeId[$option.gooogleMapOption.mapControl.id],
                mapTypeControl:false,
                mapTypeControlOptions:
				{
                    style:google.maps.MapTypeControlStyle[$option.gooogleMapOption.mapControl.style]
                },
                zoom:$option.gooogleMapOption.zoomControl.level,
                zoomControl:false,
                zoomControlOptions:false,
				fullscreenControl:false,
                streetViewControl:false,
                styles:$option.gooogleMapOption.style
            };
            
            $googleMap=new google.maps.Map($self.e('#cpbs_google_map')[0],option);
        };
        
        /**********************************************************************/
        
		this.setWidthClass=function()
		{
			var width=$this.parent().width();
			
			var className=null;
			var classPrefix='cpbs-width-';
			
			if(width>=1220) className='1220';
			else if(width>=960) className='960';
			else if(width>=768) className='768';
			else if(width>=480) className='480';
			else if(width>=300) className='300';
            else className='300';
			
			var oldClassName=$self.getValueFromClass($this,classPrefix);
			if(oldClassName!==false) $this.removeClass(classPrefix+oldClassName);
			
			$this.addClass(classPrefix+className);
			
            if(width>=960) $this.removeClass('cpbs-widthlt-960');
            else $this.addClass('cpbs-widthlt-960');
            			
			if($self.prevWidth!==width)
            {
				$self.prevWidth=width;
                $(window).resize();
                                
                $self.createStickySidebar();
				
				var searchPanel=$('.cpbs-main-content-step-1>.cpbs-form-panel>div:first');
				
				var googleMap=$('.cpbs-main-content-step-1>.cpbs-form-panel #cpbs_google_map');
				
				if(googleMap.length===1)
				{
					var padding=30;
					var googleMapHeight=parseInt(googleMap.actual('height'),10);
					var searchPanelHeight=parseInt(searchPanel.actual('height'),10);
					
					if(searchPanelHeight+(padding*2)>googleMapHeight)
					{
						googleMap.css('height',searchPanelHeight+(padding*2)+'px');
					}
					else
					{
						googleMap.css('height','800px');
					}
				}
            };
                        
			setTimeout($self.setWidthClass,500);
		};
       
		/**********************************************************************/
		
		this.getValueFromClass=function(object,pattern)
		{
			try
			{
				var reg=new RegExp(pattern);
				var className=$(object).attr('class').split(' ');

				for(var i in className)
				{
					if(reg.test(className[i]))
						return(className[i].substring(pattern.length));
				}
			}
			catch(e) {}

			return(false);		
		};
        
        /**********************************************************************/
        
        this.createSummaryPriceElement=function(callback)
        {
            $self.setAction('create_summary_price_element');
  
            $self.post($self.e('form[name="cpbs-form"]').serialize(),function(response)
            {    
                $self.e('.cpbs-summary-price-element').replaceWith(response.html);
                $(window).scroll();
				
				if(callback!==undefined) callback();
            });   
        };
        
        /**********************************************************************/
        
        this.createStickySidebar=function()
        {
            if(parseInt($option.summary_sidebar_sticky_enable,10)!==1) return;
            
            var className=$self.getValueFromClass($this,'cpbs-width-');
            
            if($.inArray(className,['300','480','768'])>-1)
            {
                $self.removeStickySidebar();
                return;
            }    
			
            var offsetTop=30;
			var offsetBottom=30;
			
            var adminBar=$('#wpadminbar');
            
            if(adminBar.length===1)
                offsetTop+=adminBar.actual('height');
			
			var step=parseInt($self.e('input[name="cpbs_step"]').val(),10);
			
            $sidebar=$self.e('.cpbs-main-content>.cpbs-main-content-step-'+step+'>.cpbs-layout-25x75 .cpbs-layout-column-left:first').theiaStickySidebar({'additionalMarginTop':offsetTop,'additionalMarginBottom':offsetBottom});
        };
        
        /**********************************************************************/
        
        this.removeStickySidebar=function()
        {
            if(parseInt($option.summary_sidebar_sticky_enable,10)!==1) return;
			try
			{
				$sidebar.destroy();
			}
			catch(e) {}
        };
		
		/**********************************************************************/
        
        this.getGlobalNotice=function()
        {
            var step=parseInt($self.e('input[name="cpbs_step"]').val(),10);
            return($self.e('.cpbs-main-content-step-'+step+' .cpbs-notice'));
        };
		
		/**********************************************************************/
		
		this.createLocationFrameLink=function()
		{
			if($.inArray('3',$option.location_detail_window_open_action)>-1)
			{
				$self.e('.cpbs-main-content-step-2').on('click','.cpbs-place-location-name a',function(e)
				{
					e.preventDefault();
					var locationId=parseInt($(this).parents('.cpbs-place:first').attr('data_location_id'),10);

					$self.openLocationFrame(locationId);
				});
			}
		};
		
		/**********************************************************************/
		
        this.openLocationFrame=function(locationId)
        {
            $self.closeLocationFrame();
			
			var list=$self.e('.cpbs-location-info-frame').find('.cpbs-location-info-frame-place-type>.cpbs-list');
			
			if(!list.hasClass('slick-slider'))
			{
				list.slick(
				{
					infinite:true,
					variableWidth:true,
					prevArrow:'<a href="#" class="slick-prev"></a>',
					nextArrow:'<a href="#" class="slick-next"></a>',
					slidesToScroll:1,
					centerMode:false 
				});
			}
			
            $self.e('.cpbs-location-info-frame[data-location_id="'+locationId+'"]').addClass('cpbs-state-open');
			
			$('body').css('overflow','hidden');
        };
		
        /**********************************************************************/
        
        this.closeLocationFrame=function()
        {
			$self.e('.cpbs-location-info-frame').removeClass('cpbs-state-open');
			$('body').css('overflow','auto');
        };
		        
        /**********************************************************************/
        /**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.CPBSBookingForm=function(option) 
	{
        console.log('--------------------------------------------------------------------------------------------');
        console.log('Car Park Booking System for WordPress ver. '+option.plugin_version);
        console.log('https://1.envato.market/car-park-booking-system-for-wordpress');
        console.log('--------------------------------------------------------------------------------------------');
        
		var form=new CPBSBookingForm(this,option);
        return(form);
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/